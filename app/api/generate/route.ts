import { NextResponse } from "next/server";
import { renderDocumentTex } from "@/lib/renderDocumentTex";
import { runTectonic } from "@/lib/runTectonic";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  const tex = renderDocumentTex(body);
  const pdf = runTectonic(tex);

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="titlepage.pdf"`,
    },
  });
}
