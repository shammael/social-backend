import { NextFunction, Request, Response } from "express";
import IUser from "../../interfaces/user";
import UserModel from "../../models/user";
import BadRequest from "../../utils/errors/ExistsError.error";
import password_encrypter from "../../utils/password_encrypter";

const registerController = async (
  req: Request<
    any,
    any,
    Omit<
      IUser,
      "picturePath" | "friends" | "viewedProfile" | "impressions" | "online"
    >
  >,
  res: Response<
    | (Omit<
        IUser,
        "picturePath" | "friends" | "viewedProfile" | "impressions"
      > & {
        _id: string;
      })
    | { message: string }
  >,
  next: NextFunction
) => {
  const { firstName, email, password, lastName, location, occupation } =
    req.body;

  const userDB = await UserModel.findOne({ email }).lean();

  if (userDB) {
    throw new BadRequest("Email not available, please choose another one");
  }

  const hashedPassword = await password_encrypter.hash(password!);

  const user = new UserModel({
    password: hashedPassword,
    email,
    location,
    lastName,
    occupation,
    firstName,
  });

  const newUser = await user.save();

  return res.status(201).json({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    location: newUser.location,
    _id: newUser._id,
    occupation: newUser.occupation,
    email: newUser.email,
    online: newUser.online,
  });
};

export default registerController;
