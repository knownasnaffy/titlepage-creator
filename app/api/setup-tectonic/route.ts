import { NextResponse } from "next/server";
import { existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

import { mkdirSync } from "fs";

export const runtime = "nodejs";

function getPlatform() {
  switch (process.platform) {
    case "win32":
      return "windows";
    case "darwin":
      return "mac";
    case "linux":
      return "linux";
    default:
      return "unsupported";
  }
}

export async function POST() {
  try {
    const platform = getPlatform();
    if (platform === "unsupported") {
      return NextResponse.json(
        { error: "Unsupported platform" },
        { status: 400 },
      );
    }

    const binDir = join(process.cwd(), "bin");
    const binaryName = platform === "windows" ? "tectonic.exe" : "tectonic";
    const binaryPath = join(binDir, binaryName);

    mkdirSync(binDir, { recursive: true });

    // 1. Binary already exists
    if (existsSync(binaryPath)) {
      return NextResponse.json({
        ok: true,
        message: "Tectonic already installed",
      });
    }

    // 2. Install
    if (platform === "windows") {
      execSync(
        `
powershell -NoProfile -ExecutionPolicy Bypass -Command "
[System.Net.ServicePointManager]::SecurityProtocol =
  [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://drop-ps1.fullyjustified.net'))
"
        `,
        { cwd: binDir, stdio: "inherit" },
      );
    } else {
      execSync(
        `curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh`,
        { cwd: binDir, stdio: "inherit", shell: "/usr/bin/bash" },
      );
    }

    // 3. Verify install
    if (!existsSync(binaryPath)) {
      return NextResponse.json(
        { error: "Tectonic installation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Tectonic installed successfully",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to setup Tectonic",
        details: String(err),
      },
      { status: 500 },
    );
  }
}
