import password_encrypter from "../../../utils/password_encrypter/index.js";
import {
  ErrorName,
  LoginResponse,
  MutationLoginArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/types.js";
import getUserModel from "../../models/user/getUserModel.js";
import token from "../../../utils/Token/index.js";
import authModel from "../../models/auth/auth.js";
import ExpressContext from "../../../interfaces/context.js";
import { GraphQLError } from "graphql";

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
  console.log(user);
  if (!user) {
    throw new GraphQLError("Account not found", {
      extensions: {
        code: "403",
        field: "Email",
      },
    });
  }

  const valid = await password_encrypter.compare(password, user.password!);

  if (!valid) {
    throw new GraphQLError("Incorrect password ", {
      extensions: {
        code: "401",
        field: "Password",
      },
    });
  }

  const access_token = token.sign({ id: user._id }, process.env.ACCESS_TOKEN!, {
    expiresIn: "24h",
  });

  console.log({ access_token });

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
