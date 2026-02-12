import { NextResponse } from "next/server";
import { renderDocumentTex } from "@/lib/renderDocumentTex";
import { runTectonic } from "@/lib/runTectonic";
import { existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

export const runtime = "nodejs";

function setupTectonicIfNeeded() {
  const binDir = join(process.cwd(), "bin");
  const binaryName = process.platform === "win32" ? "tectonic.exe" : "tectonic";
  const binaryPath = join(binDir, binaryName);

  if (existsSync(binaryPath)) return;

  if (process.platform === "win32") {
    execSync(
      `powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://drop-ps1.fullyjustified.net'))"`,
      { cwd: binDir, stdio: "inherit" }
    );
  } else {
    execSync(
      `curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh`,
      { cwd: binDir, stdio: "inherit", shell: "/usr/bin/bash" }
    );
  }
}

export async function POST(req: Request) {
  try {
    setupTectonicIfNeeded();
    
    const body = await req.json();
    const tex = renderDocumentTex(body);
    const pdf = runTectonic(tex);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="titlepage.pdf"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate PDF", details: String(err) },
      { status: 500 }
    );
  }
}
