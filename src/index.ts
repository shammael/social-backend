import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";
import connect from "./utils/db/index.js";
import dotenv from "dotenv";
import ExpressContext from "./interfaces/context.js";
import { shield } from "graphql-shield";
import isAuthenticated from "./graphql/middlewares/auth.middleware.js";

dotenv.config();

const permissions = shield({
  Mutation: {
    logout: isAuthenticated,
  },
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [permissions],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
  context: async ({ req, res }: ExpressContext): Promise<ExpressContext> => ({
    req,
    res,
  }),
});

await connect();

console.log(`🚀  Server ready at: ${url}`);
