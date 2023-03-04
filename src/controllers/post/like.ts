import { Request, Response } from "express";
import PostModel from "../../models/post.schema";
import BadRequest from "../../utils/errors/ExistsError.error";

const likePostController = async (
  req: Request,
  res: Response<{ message: string }>
) => {
  const { postId } = req.params;
  const userId = req.userID;

  const post = await PostModel.findOne({ active: true, id: postId });

  if (!post) {
    throw new BadRequest("Acción no permitida");
  }

  if (post.likes.includes({ userID: userId! })) {
    await PostModel.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
    });
  } else {
    await PostModel.findByIdAndUpdate(postId, {
      $push: { likes: userId },
    });
  }

  return res.status(200).json({ message: "Success" });
};

export default likePostController;
