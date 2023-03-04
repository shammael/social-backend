import { NextFunction, Request, Response } from "express";
import IPost from "../../interfaces/post";
import { UnauthorizedError } from "../../utils/errors";
import PostModel from "../../models/post.schema";

const createPostController = async (
  req: Request<
    any,
    any,
    Omit<
      IPost,
      "likes" | "comments" | "createdAt" | "updatedAt" | "userID" | "status"
    >
  >,
  res: Response<IPost>,
  next: NextFunction
) => {
  if (!req.userID) {
    throw new UnauthorizedError("Invalid Acción");
  }

  const { description, picturePath } = req.body;

  const postDB = new PostModel(description, picturePath);

  await postDB.save();

  res.status(201).json(postDB);
};

export default createPostController;
