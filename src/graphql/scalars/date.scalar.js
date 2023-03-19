"use strict";
exports.__esModule = true;
var graphql_1 = require("graphql");
var dateScalar = new graphql_1.GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize: function (value) {
        if (value instanceof Date) {
            return value.getTime();
        }
        throw Error("GraphQL Date Scalar serializer expected a `Date` object");
    },
    parseValue: function (value) {
        if (typeof value === "number") {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error("GraphQL Date Scalar parser expected a `number`");
    },
    parseLiteral: function (ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    }
});
exports["default"] = dateScalar;
