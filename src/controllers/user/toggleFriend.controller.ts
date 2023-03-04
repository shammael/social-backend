import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../utils/errors";
import UserModel from "../../models/user";
import BadRequest from "../../utils/errors/ExistsError.error";

interface IAddFriendRequestModel
  extends Request<any, any, { friendID: string }> {
  userID: any;
}

// We cannot add the direct typed to request because express expect receive a Request  type not another one

const toggleFriendController = async (
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  if (!req.userID) {
    throw new UnauthorizedError("Invalid Acción");
  }

  const { friendID } = req.params;

  const user = await UserModel.findById(req.userID);
  if (!user?.friends) {
    throw new BadRequest("Accion no permitida");
  }

  if (user.friends.includes(friendID)) {
    await UserModel.findByIdAndUpdate(req.userID, {
      $pull: { friends: friendID },
    });
  } else {
    user.friends.push(friendID);
    await UserModel.findByIdAndUpdate(req.userID, {
      $push: { friends: friendID },
    });
  }

  return res.status(200).json({ message: "Friend added successfully" });
};

export default toggleFriendController;

// write a mongo query who updates the list of the user's friends but check in the friends list id if the added one is not in the friends list if the added one is in the friends list remove it and it's not in the friends list add it and it's in the friends list
