import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: Error & {
    name: string;
    statusCode: number;
    messages: { field: string; message: string }[];
  },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  if (err.statusCode) {
    return res
      .status(err.statusCode)
      .json(err.messages.length > 0 ? err.messages : { message: err.message });
  }

  return res.status(500).json({ message: "An error have been occured" });
};

export default errorMiddleware;
