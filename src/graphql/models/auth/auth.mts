import { IUser } from "../../../interfaces";
import UserModel from "../../../services/models/user.schema";
import ErrorMessage from "../../generated/error_message.types.mjs";
import { ErrorName, InternalServerError } from "../../generated/types.mjs";

interface IRequestValue
  extends Partial<Pick<IUser, "active" | "online" | "_id">> {
  token?: string | null;
}

interface IUpdateValue extends Omit<IRequestValue, "active"> {}

const authModel = async (
  request: IRequestValue,
  update: IUpdateValue
): Promise<IUser | null | InternalServerError> => {
  try {
    const user = await UserModel.findOneAndUpdate(request, update);
    return user;
  } catch (error) {
    return {
      __typename: "InternalServerError",
      name: ErrorName.Internalservererror,
      code: 500,
      message: ErrorMessage.Server,
    };
  }
};

export default authModel;
