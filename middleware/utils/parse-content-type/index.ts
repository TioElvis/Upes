type TContentType = {
  type: string;
  boundary: string;
};

function parseContentType(
  contentType: string | undefined
): TContentType | undefined {
  const parse: Array<string> | undefined = contentType?.split(";");

  if (parse === undefined) return undefined;

  const type: string = parse[0];
  const boundary: string = parse[1].split("=")[1];

  return {
    type: type,
    boundary: boundary,
  };
}

export default parseContentType;
