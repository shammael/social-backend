import {
  InternalServerError,
  PostList,
  PostsRespose,
  QueryPostsArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/types";
import getPosts from "../../models/post/get_posts.model";

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
