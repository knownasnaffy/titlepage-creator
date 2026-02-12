import { spawnSync } from "child_process";
import { join } from "path";
import { existsSync, readFileSync, mkdirSync, unlinkSync } from "fs";

function getTectonicPath(): string {
  const binDir = join(process.cwd(), "bin");

  if (process.platform === "win32") {
    const exe = join(binDir, "tectonic.exe");
    if (existsSync(exe)) return exe;
  } else {
    const bin = join(binDir, "tectonic");
    if (existsSync(bin)) return bin;
  }

  throw new Error("Tectonic binary not found");
}

export function runTectonic(tex: string): Buffer {
  const tectonicPath = getTectonicPath();

  const dataDir = join(process.cwd(), "data");
  const outDir = join(dataDir, "export");
  const pdfPath = join(outDir, "texput.pdf");

  mkdirSync(outDir, { recursive: true });

  const result = spawnSync(
    tectonicPath,
    ["-", "--print", "--outdir", "export"],
    {
      cwd: dataDir,
      input: tex,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Tectonic failed:\n${result.stderr || result.stdout}`);
  }

  if (!existsSync(pdfPath)) {
    throw new Error("PDF was not generated");
  }

  const pdf = readFileSync(pdfPath);

  // ✅ cleanup temp file
  unlinkSync(pdfPath);

  return pdf;
}
