import { renderDocumentTex } from "../lib/renderDocumentTex";
import { runTectonic } from "../lib/runTectonic";
import { writeFileSync } from "fs";

const tex = renderDocumentTex({
  sub_name: "OPERATING SYSTEMS",
  prof_name: "Dr. A.K. Singh",
  stud_name: "Barinderpreet Singh",
  coll_roll_no: "241061",
  uni_roll_no: "2414225",
});

const pdf = runTectonic(tex);

// dev-only convenience
writeFileSync("out.pdf", pdf);

console.log("PDF written to out.pdf");
