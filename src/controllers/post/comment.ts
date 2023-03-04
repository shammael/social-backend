import { NextFunction, Request, Response } from "express";
import IPost from "../../interfaces/post";
import PostModel from "../../models/post.schema";

const commentPostController = async (
  req: Request<
    any,
    any,
    Omit<
      IPost,
      "likes" | "comments" | "createdAt" | "updatedAt" | "status" | "userID"
    >,
    { postID: string }
  >,
  res: Response<IPost>,
  next: NextFunction
) => {
  const { userID } = req;
  const { postID } = req.query;
  const { description, picturePath } = req.body;

  const post = new PostModel({
    description,
    picturePath,
    commentFrom: postID,
    userID,
  });

  const postDB = await post.save();

  return res.status(201).json(postDB);
};

export default commentPostController;
