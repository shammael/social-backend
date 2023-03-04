import { NextFunction, Request, Response } from "express";
import { IUser } from "../../interfaces";
import UserModel from "../../models/user";

const getUserFriendsController = async (
  req: Request,
  res: Response<IUser[]>
) => {
  const userID = req.userID;

  const getUserFriends = (await UserModel.findById(userID!)
    .select("friends")
    .populate({
      path: "friends",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        location: 1,
        ocupation: 1,
        online: 1,
        picturePath: 1,
      },
    })
    .lean()) as IUser[];

  return res.status(200).json(getUserFriends);
};

export default getUserFriendsController;
