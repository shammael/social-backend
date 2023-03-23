import UserModel from "../../../services/models/user.schema.js";
import ErrorMessage from "../../generated/error_message.types.js";
import { ErrorName, InternalServerError, User } from "../../generated/types.js";

interface IRequestValue
  extends Partial<Pick<User & { active?: boolean }, "online" | "_id">> {
  token?: string | null;
}

interface IUpdateValue extends Omit<IRequestValue, "active"> {}

const authModel = async (
  request: IRequestValue,
  update: IUpdateValue
): Promise<User | null | InternalServerError> => {
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
