import { rule } from "graphql-shield";
import ExpressContext from "../../interfaces/context";
import token from "../../utils/Token/index.mjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// import { GraphQLError } from "graphql/error"; // cjs
// Interopability between commonjs with esm because GraphqlError is cjs
const { GraphQLError } = require("graphql/error");

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx: ExpressContext, info) => {
    const authorizationHeader = ctx.req.headers.authorization;
    if (!authorizationHeader) {
      return new GraphQLError("headers data not found");
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      return new GraphQLError("Invalid authroization header");
    }

    const userToken = authorizationHeader
      .slice(7, authorizationHeader.length)
      .trimStart();

    if (!token.verify(userToken, process.env.ACCESS_TOKEN!)) {
      return new GraphQLError("Invalid Token");
    }

    ctx.req.userID = userToken;

    return true;
  }
);

export default isAuthenticated;
