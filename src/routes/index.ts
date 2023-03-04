import { Router } from "express";
import seedController from "../controllers/seed/seed";
import use from "../utils/express/use";
import authRoutes from "./auth";
import postRoutes from "./post";
import userRoutes from "./user";

const appRouter = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/user", userRoutes);
appRouter.use("/post", postRoutes);

appRouter.put("/seed", use(seedController));

export default appRouter;
