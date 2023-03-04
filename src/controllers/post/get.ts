import { Request, Response } from "express";
import IPost from "../../interfaces/post";
import PostModel from "../../models/post.schema";
import BadRequest from "../../utils/errors/ExistsError.error";

const getPostController = async (
  req: Request<any, any, any, { postId: string }>,
  res: Response<IPost>
) => {
  const { userID } = req;
  const { postId } = req.query;
  const post = await PostModel.findOne({
    status: "active",
    _id: postId,
    commentFrom: undefined,
  });
  if (!post) {
    throw new BadRequest("Acción no permitida");
  }
  return res.status(200).json(post);
};

export default getPostController;
