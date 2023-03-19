import { Request, Response } from "express";

interface ExpressContext {
  req: Request & { headers: { [key: string]: string } } & { userID?: string };
  res: Response;
}

export default ExpressContext;
