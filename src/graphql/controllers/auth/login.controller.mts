import password_encrypter from "../../../utils/password_encrypter";
import {
  ErrorName,
  LoginResponse,
  MutationLoginArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/types.mjs";
import getUserModel from "../../models/user/getUserModel.mjs";
import token from "../../../utils/Token/index.mjs";
import authModel from "../../models/auth/auth.mjs";
import ExpressContext from "../../../interfaces/context";

const loginController: Resolver<
  ResolverTypeWrapper<LoginResponse>,
  {},
  ExpressContext,
  RequireFields<MutationLoginArgs, "input">
> = async (
  _,
  { input: { email, password } },
  { res, req }
): Promise<LoginResponse> => {
  const user = await getUserModel({ email });
  if (!user) {
    return {
      __typename: "BadRequestError",
      code: 400,
      message: "Bad Request",
      name: ErrorName.Badrequest,
      messages: [
        {
          field: "email",
          message: "User not found",
        },
      ],
    };
  }

  const valid = await password_encrypter.compare(password, user.password!);

  if (!valid) {
    return {
      __typename: "BadRequestError",
      code: 400,
      message: "Bad Request",
      name: ErrorName.Badrequest,
      messages: [
        {
          field: "email",
          message: "User not found",
        },
      ],
    };
  }

  const access_token = token.sign({ id: user._id }, process.env.ACCESS_TOKEN!, {
    expiresIn: "24h",
  });

  const refresh_token = token.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN!,
    {
      expiresIn: "24h",
    }
  );

  await authModel({ _id: user._id }, { online: true, token: refresh_token });

  res.cookie("jwt", access_token, {
    maxAge: 24 * 60 * 60 * 1000,
  });

  return {
    __typename: "LoginData",
    token: access_token,
    user,
  };
};

export default loginController;
