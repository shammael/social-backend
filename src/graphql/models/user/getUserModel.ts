import UserModel from "../../../services/models/user.schema.js";
import { User } from "../../generated/types.js";

interface IGetUserRequest
  extends Partial<
    Pick<User & { active?: boolean }, "email" | "online" | "_id">
  > {}

const getUserModel = async (value: IGetUserRequest) => {
  const user = await UserModel.findOne(value).lean();
  return user;
};

export default getUserModel;
