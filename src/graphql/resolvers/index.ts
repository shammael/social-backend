import { mergeResolvers } from "@graphql-tools/merge";
import dateScalar from "../scalars/date.scalar.js";
import emailScalar from "../scalars/email.scalar.js";
import tokenScalar from "../scalars/token.scalar.js";
import authResolver from "./auth.js";
import postResolvers from "./post.js";

const resolvers = [
  { Date: dateScalar, Email: emailScalar, Token: tokenScalar },
  authResolver,
  postResolvers,
];

export default mergeResolvers(resolvers);
