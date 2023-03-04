import { Router } from "express";
import {
  commentPostController,
  getPostController,
  getUserPostsController,
  likePostController,
} from "../../controllers/post";
import createPostController from "../../controllers/post/create";
import { verifyTokenMiddleware } from "../../middlewares";
import use from "../../utils/express/use";

const postRouter = Router();

postRouter.post("/new", verifyTokenMiddleware, use(createPostController));
postRouter.patch(
  "/like/:postId",
  verifyTokenMiddleware,
  use(likePostController)
);
postRouter.patch(
  "/comment/:postId",
  verifyTokenMiddleware,
  use(commentPostController)
);

postRouter.get("/all/:postId", use(getUserPostsController));

postRouter.get("/:id", use(getPostController));

export default postRouter;
