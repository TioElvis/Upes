import saveFile from "../save-file";

function parseBuffer(buffer: Buffer, boundary: string) {
  // Decode the buffer to utf-8 and split it for get his value
  const blocks = buffer.toString("utf-8").split(`${boundary}`).slice(1, -1);
  const object = new Map();

  blocks.forEach((block) => {
    const [params, value]: Array<string> = block.split("\r\n\r\n"); // Separate the params to the value
    const parseValue: string = value.replace("\r\n--", "");
    const array: Array<string> = params.replaceAll('"', "").split(";"); // Separete the params for get the fieldname, the filename and the mimetype if is a file
    const isFile: boolean = array.length > 2;

    const fieldname: string = array[1].replace(" ", "").split("=")[1];

    if (isFile) {
      const [filename, mimetype] = array[2].split("\r\n"); // Separate the filename to the mimetype
      const parseFilename = filename.split("=")[1];
      const parseMimetype = `.${mimetype.split(":")[1].split("/")[1]}`;

      // Push the relative params of the file to the object for then return it
      object.set(fieldname, {
        filename: parseFilename,
        mimetype: parseMimetype,
      });
    } else {
      // Push only his fieldname and his value because is a text-plain
      object.set(fieldname, parseValue);
    }
  });

  return object;
}

export default parseBuffer;
