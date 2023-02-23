import express, { Request, Response } from "express";
import Upes from "../middleware";

const app = express();

const start = new Upes();

app.post("/", start.setup.bind(start), (req: Request, res: Response) => {
  res.send("all right");
});

app.listen(3000, () => {
  console.log("The server is active");
});
