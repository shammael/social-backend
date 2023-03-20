import IPost from "../../../interfaces/post";
import { PostModel } from "../../../services/models";
import ErrorMessage from "../../generated/error_message.types.mjs";
import {
  ErrorName,
  InternalServerError,
  Post,
} from "../../generated/types.mjs";

interface IRequest extends Partial<Pick<IPost, "_id" | "status" | "level">> {}

const getPostModel = async (
  request: IRequest
): Promise<Post | null | InternalServerError> => {
  try {
    const post = await PostModel.findOne(request).lean();
    return post as Post;
  } catch (error) {
    return {
      __typename: "InternalServerError",
      name: ErrorName.Internalservererror,
      code: 500,
      message: ErrorMessage.Server,
    };
  }
};

export default getPostModel;
