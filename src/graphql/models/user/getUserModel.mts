import { IUser } from "../../../interfaces";
import UserModel from "../../../services/models/user.schema";

interface IGetUserRequest
  extends Partial<Pick<IUser, "active" | "email" | "online" | "_id">> {}

const getUserModel = async (value: IGetUserRequest) => {
  const user = await UserModel.findOne(value).lean();
  return user;
};

export default getUserModel;
