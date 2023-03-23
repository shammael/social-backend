import {
  InternalServerError,
  PostList,
  PostsRespose,
  QueryPostsArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/types.js";
import getPosts from "../../models/post/get_posts.model.js";

const getPostsController: Resolver<
  ResolverTypeWrapper<PostsRespose>,
  {},
  any,
  RequireFields<QueryPostsArgs, "input">
> = async (_, { input: { page, limit } }): Promise<PostsRespose> => {
  return getPosts({
    page,
    limit: limit as undefined | number,
  });
};

export default getPostsController;
