import { readFileSync } from "fs";
import { join } from "path";
import { validateSafeInput } from "./utils";

type DocumentValues = {
  sub_name: string;
  prof_name: string;
  stud_name: string;
  coll_roll_no: string;
  uni_roll_no: string;
};

export function renderDocumentTex(values: DocumentValues): string {
  const templatePath = join(process.cwd(), "data", "document.tex");
  let tex = readFileSync(templatePath, "utf8");

  const replacements: Record<string, string> = {
    "<sub_name>": validateSafeInput(values.sub_name, "Subject Name"),
    "<prof_name>": validateSafeInput(values.prof_name, "Professor Name"),
    "<stud_name>": validateSafeInput(values.stud_name, "Student Name"),
    "<coll_roll_no>": validateSafeInput(values.coll_roll_no, "College Roll No"),
    "<uni_roll_no>": validateSafeInput(
      values.uni_roll_no,
      "University Roll No",
    ),
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    tex = tex.replaceAll(placeholder, value);
  }

  return tex;
}
