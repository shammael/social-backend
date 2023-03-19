import {
  BadRequestError,
  ErrorName,
  Post,
  QueryPostArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/types";
import getPostModel from "../../models/post/get_post.model";
import checkIDModel from "../../models/utils/checkID";

const getPostController: Resolver<
  ResolverTypeWrapper<BadRequestError | Post>,
  {},
  any,
  RequireFields<QueryPostArgs, "id">
> = async (_, { id }): Promise<BadRequestError | Post> => {
  const valid = checkIDModel(id);

  if (!valid) {
    return {
      __typename: "BadRequestError",
      code: 400,
      message: "Invalid ID",
      name: ErrorName.Badrequest,
    };
  }

  const post = await getPostModel({ _id: id });

  if (!post) {
    return {
      __typename: "BadRequestError",
      code: 400,
      message: "Post not found",
      name: ErrorName.Badrequest,
    };
  }
  return post as Post;
};

export default getPostController;
