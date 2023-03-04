import { Router } from "express";
import loginController from "../../controllers/auth/login";
import refreshTokenController from "../../controllers/auth/refresh_token";
import registerController from "../../controllers/auth/register";
import use from "../../utils/express/use";
import { upload } from "../../utils/multer";

const authRouter = Router();

// upload.single("picture"),

authRouter.post("/register", use(registerController));
authRouter.post("/login", use(loginController));
authRouter.get("/refresh", use(refreshTokenController));

export default authRouter;
