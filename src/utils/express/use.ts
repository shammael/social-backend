import { NextFunction, Request, RequestHandler, Response } from "express";

const use = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch((err: unknown) => next(err));
};

export default use;
