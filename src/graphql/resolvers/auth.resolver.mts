import loginController from "../controllers/auth/login.controller.mjs";
import logoutController from "../controllers/auth/logout.controller.mjs";
import { Resolvers } from "../generated/types.mjs";

const loginResolver: Resolvers = {
  Mutation: {
    login: loginController,
    logout: logoutController,
  },
};

export default loginResolver;
