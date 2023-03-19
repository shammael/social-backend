import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./utils/db/index";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import emailScalar from "./graphql/scalars/email.scalar";
import tokenScalar from "./graphql/scalars/token.scalar";
import graphqlExpressPlaground from "graphql-playground-middleware-express";
import { applyMiddleware } from "graphql-middleware";
import { shield } from "graphql-shield";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import isAuthenticated from "./graphql/middlewares/auth.middleware";
import dateScalar from "./graphql/scalars/date.scalar";
/*
  The fact that we use ES Module, __dirname and __filename doesn't exist. Only exist with comonjs
*/

dotenv.config();

const typesArray = mergeTypeDefs(loadFilesSync("./src/**/*.graphql"));
const resolversArray = mergeResolvers([
  { Email: emailScalar, Date: dateScalar, Token: tokenScalar },
  ...loadFilesSync("./src/**/*.resolver.ts"),
]);

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  // resolvers: [{ Email: emailScalar, Token: tokenScalar }, ...resolversArray],
  resolvers: resolversArray,
});

const permissions = shield({
  Mutation: {
    logout: isAuthenticated,
  },
});

const schemaMiddleware = applyMiddleware(schema, permissions);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// app.use(cookieParser());

app.use(cors());
// app.use(
//   "/assets",
//   express.static(path.resolve(__dirname, "", "/public/assets"))
// );

// app.use("/api", appRouter);

// app.use(errorMiddleware);

app.use(
  "/graphql",
  cookieParser(),
  graphqlHTTP((req, res) => {
    return {
      graphiql: true,
      schema: schemaMiddleware,
      context: { res, req },
    };
  })
);

app.use("/playground", graphqlExpressPlaground({ endpoint: "/graphql" }));

const PORT = process.env.PORT || 3001;

connect(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});