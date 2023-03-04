import { NextFunction, Request, Response } from "express";
import IUser from "../../interfaces/user";
import UserModel from "../../models/user";
import { UnauthorizedError } from "../../utils/errors";
import password_encrypter from "../../utils/password_encrypter";
import token from "../../utils/Token";

const loginController = async (
  req: Request<any, any, { password: string; email: string }>,
  res: Response<{ user: IUser; token: string }>,
  next: NextFunction
) => {
  const { email, password } = req.body;

  console.log({ password });

  const user = await UserModel.findOneAndUpdate(
    { email },
    {
      $set: {
        online: true,
      },
    }
  ).lean();

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const valid = await password_encrypter.compare(password, user.password!);

  if (!valid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const access_token = token.sign({ id: user._id }, process.env.ACCESS_TOKEN!, {
    expiresIn: "24h",
  });

  const refresh_token = token.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN!,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("jwt", refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ user, token: access_token });
};

export default loginController;
