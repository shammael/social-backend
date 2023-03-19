import {
  getPostsController,
  getPostController,
  toggleLikePostController,
} from "../controllers/post";
import { Resolvers } from "../generated/types.js";

const postResolvers: Resolvers = {
  Query: {
    posts: getPostsController,
    post: getPostController,
  },
  Mutation: {
    toggleLikePost: toggleLikePostController,
  },
};

export default postResolvers;
