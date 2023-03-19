import ExpressContext from "../../../interfaces/context";
import ErrorMessage from "../../generated/error_message.types";
import {
  ErrorName,
  MutationToggleLikePostArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  ToogleLikeResponse,
} from "../../generated/types";
import likePostModel from "../../models/post/toggle_like_post.model";

const toggleLikePostController: Resolver<
  ResolverTypeWrapper<ToogleLikeResponse>,
  {},
  ExpressContext,
  RequireFields<MutationToggleLikePostArgs, "input">
> = async (_, { input }, { req }): Promise<ToogleLikeResponse> => {
  try {
    const postDB = await likePostModel({
      id: input.id,
      postdata: { reaction: input.reaction, userID: req.userID! },
    });

    if (!postDB) {
      return {
        __typename: "BadRequestError",
        code: 400,
        message: "Post not found",
        name: ErrorName.Badrequest,
      };
    }

    return { message: "The post have been toggle liked successfuly" };
  } catch (error) {
    return {
      __typename: "InternalServerError",
      code: 500,
      message: ErrorMessage.Server,
      name: ErrorName.Internalservererror,
    };
  }
};

export default toggleLikePostController;
