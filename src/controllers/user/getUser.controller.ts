import { Request, Response, NextFunction } from "express";
import { IUser } from "../../interfaces";
import UserModel from "../../models/user";
import BadRequest from "../../utils/errors/ExistsError.error";

const getUserController = async (
  req: Request<any, any, any, { id: string }>,
  res: Response<IUser>,
  next: NextFunction
) => {
  const { id } = req.query;
  const validID = UserModel.validID(id);
  if (!validID) {
    throw new BadRequest("Invalid request");
  }
  const user = await UserModel.findOne({
    $and: [{ _id: id }, { active: true }],
  }).lean();
  return res.status(200).json(user);
};

export default getUserController;
