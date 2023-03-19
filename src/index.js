"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var dotenv_1 = require("dotenv");
var index_1 = require("./utils/db/index");
var cookie_parser_1 = require("cookie-parser");
var express_graphql_1 = require("express-graphql");
var load_files_1 = require("@graphql-tools/load-files");
var schema_1 = require("@graphql-tools/schema");
var email_scalar_1 = require("./graphql/scalars/email.scalar");
var token_scalar_1 = require("./graphql/scalars/token.scalar");
var graphql_playground_middleware_express_1 = require("graphql-playground-middleware-express");
var graphql_middleware_1 = require("graphql-middleware");
var graphql_shield_1 = require("graphql-shield");
var merge_1 = require("@graphql-tools/merge");
var auth_middleware_1 = require("./graphql/middlewares/auth.middleware");
var date_scalar_1 = require("./graphql/scalars/date.scalar");
/*
  The fact that we use ES Module, __dirname and __filename doesn't exist. Only exist with comonjs
*/
dotenv_1["default"].config();
var typesArray = (0, merge_1.mergeTypeDefs)((0, load_files_1.loadFilesSync)("./src/**/*.graphql"));
var resolversArray = (0, merge_1.mergeResolvers)(__spreadArray([
    { Email: email_scalar_1["default"], Date: date_scalar_1["default"], Token: token_scalar_1["default"] }
], (0, load_files_1.loadFilesSync)("./src/**/*.resolver.ts"), true));
var schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: typesArray,
    // resolvers: [{ Email: emailScalar, Token: tokenScalar }, ...resolversArray],
    resolvers: resolversArray
});
var permissions = (0, graphql_shield_1.shield)({
    Mutation: {
        logout: auth_middleware_1["default"]
    }
});
var schemaMiddleware = (0, graphql_middleware_1.applyMiddleware)(schema, permissions);
var app = (0, express_1["default"])();
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json({ limit: "30mb" }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1["default"])("common"));
// app.use(cookieParser());
app.use((0, cors_1["default"])());
// app.use(
//   "/assets",
//   express.static(path.resolve(__dirname, "", "/public/assets"))
// );
// app.use("/api", appRouter);
// app.use(errorMiddleware);
app.use("/graphql", (0, cookie_parser_1["default"])(), (0, express_graphql_1.graphqlHTTP)(function (req, res) {
    return {
        graphiql: true,
        schema: schemaMiddleware,
        context: { res: res, req: req }
    };
}));
app.use("/playground", (0, graphql_playground_middleware_express_1["default"])({ endpoint: "/graphql" }));
var PORT = process.env.PORT || 3001;
(0, index_1["default"])(function () {
    app.listen(PORT, function () { return console.log("Server is running on port ".concat(PORT)); });
});
