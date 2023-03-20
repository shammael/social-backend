import {
  ErrorName,
  InternalServerError,
  PostList,
} from "../../generated/types.mjs";
import PostModel from "../../../services/models/post.schema";
import ErrorMessage from "../../generated/error_message.types.mjs";

interface IRequest {
  page: number;
  limit?: number;
}

const getPosts = async ({
  page,
  limit = 10,
}: IRequest): Promise<PostList | InternalServerError> => {
  try {
    const posts = await PostModel.paginate(
      { status: "active" },
      { lean: true, page, limit }
    );
    return posts as PostList;
  } catch (error) {
    return {
      __typename: "InternalServerError",
      code: 500,
      message: ErrorMessage.Server,
      name: ErrorName.Internalservererror,
    };
  }
};

export default getPosts;
