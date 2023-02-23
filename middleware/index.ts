import { Request, Response, NextFunction } from "express";

// Utils
import parseBuffer from "./utils/parse-buffer";
import parseContentType from "./utils/parse-content-type";

class Upes {
  // Create middleware
  setup(request: Request, _response: Response, next: NextFunction) {
    // Get the headers of the request (only accept multipart/form-data)
    const contentType = parseContentType(request.headers["content-type"]);

    if (contentType === undefined) {
      throw new Error("Malformed content-type");
    }

    if (contentType.type !== "multipart/form-data") {
      throw new Error("The type of the request is not multipart/form-data");
    }

    // Get the form-data in a buffer
    this.#getBuffer(request, (buffer) => {
      // Get the references of the fieldsname
      const data = parseBuffer(buffer, contentType.boundary);
      console.log({ data });
      next();
    });
  }

  #getBuffer(request: Request, callback: (buffer: Buffer) => void) {
    let buffer: Buffer;

    request.on("data", (chunk) => {
      buffer += chunk;
    });

    request.on("end", () => {
      callback(buffer);
    });
  }
}

export default Upes;
