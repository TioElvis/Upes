import { writeFile } from "node:fs";

function saveFile(filename: string, file: string) {
  writeFile(filename, file, (err) => {
    if (err) {
      throw new Error("Error to save the file");
    }
  });

  return "file save succefully";
}

export default saveFile;
