import ExpressContext from "../../../interfaces/context.js";
import {
  ErrorName,
  LogoutResponse,
  MutationLogoutArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/types.js";
import authModel from "../../models/auth/auth.js";

const logoutController: Resolver<
  ResolverTypeWrapper<LogoutResponse>,
  {},
  ExpressContext,
  RequireFields<MutationLogoutArgs, "id">
> = async (_, __, { req, res }): Promise<LogoutResponse> => {
  const user = await authModel(
    { _id: req.userID, online: true },
    { online: false, token: null }
  );
  res.clearCookie("jwt", {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  if (!user) {
    return {
      __typename: "ForbiddenError",
      name: ErrorName.Forbidden,
      message: "Accion denied",
      code: 403,
    };
  }
  return { message: "user has been logged out successfully" };
};

export default logoutController;
