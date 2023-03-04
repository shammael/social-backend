import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../utils/errors";
import BadRequest from "../../utils/errors/ExistsError.error";
import token from "../../utils/Token";

const refreshTokenController = (
  req: Request,
  res: Response<string>,
  next: NextFunction
) => {
  const cookieToken = req.cookies.jwt;

  if (!cookieToken) {
    throw new UnauthorizedError("Acción no permitida");
  }

  let payload;
  let error: any;

  try {
    payload = token.verify<{ id: string }>(
      cookieToken,
      process.env.REFRESH_TOKEN!
    );
  } catch (err: any) {
    error = err;
  }

  if (error === undefined) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    throw new UnauthorizedError("Acción no permitida");
  }

  const access_token = token.sign(
    { id: payload?.id },
    process.env.ACCESS_TOKEN!,
    {
      expiresIn: process.env.NODE_ENV === "development" ? "24h" : "10m",
    }
  );

  res.status(200).json(access_token);
};

export default refreshTokenController;
