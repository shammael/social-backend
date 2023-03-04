import { Request, Response } from "express";
import PostModel from "../../models/post.schema";

const getUserPostsController = async (
  req: Request<any, any, any, { userId: string }>,
  res: Response
) => {
  const { userId } = req.query;

  const posts = await PostModel.paginate({
    status: "active",
    userID: userId,
    commentFrom: undefined,
  });

  res.status(200).json(posts);
};

export default getUserPostsController;
