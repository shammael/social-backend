import { NextFunction, Request, Response } from "express";
import { ForbidenError } from "../../utils/errors";
import token from "../../utils/Token";

const verifyTokenMiddleware = (
  req: Request & { userID?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    let userToken = req.header("Authorization");
    if (!userToken) {
      throw new ForbidenError("Access Denied");
    }
    if (userToken.startsWith("Bearer ")) {
      userToken = userToken.slice(7, userToken.length).trimStart();
    }

    req.userID = token.verify<{ id: string }>(
      userToken,
      process.env.ACCESS_TOKEN!
    ).id;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyTokenMiddleware;
