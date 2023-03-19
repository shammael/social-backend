import { Resolvers } from "../generated/types.js";
import loginController from "../controllers/auth/login.controller";
import logoutController from "../controllers/auth/logout.controller";

const loginResolver: Resolvers = {
  Mutation: {
    login: loginController,
    logout: logoutController,
  },
};

export default loginResolver;
