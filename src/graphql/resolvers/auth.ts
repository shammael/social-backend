import {
  loginController,
  logoutController,
} from "../controllers/auth/index.js";
import { Resolvers } from "../generated/types.js";

const authResolver: Resolvers = {
  Mutation: {
    login: loginController,
    logout: logoutController,
  },
};

export default authResolver;
