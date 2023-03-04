import { Router } from "express";
import {
  toggleFriendController,
  getUserController,
  getUserFriendsController,
} from "../../controllers/user";
import { verifyTokenMiddleware } from "../../middlewares";
import use from "../../utils/express/use";

const userRouter = Router();

userRouter.get(
  "/friends",
  verifyTokenMiddleware,
  use(getUserFriendsController)
);

userRouter.patch(
  "/toggle/:friendID",
  verifyTokenMiddleware,
  use(toggleFriendController)
);

userRouter.get("/:id", verifyTokenMiddleware, use(getUserController));

export default userRouter;
