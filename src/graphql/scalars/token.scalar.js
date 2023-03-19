"use strict";
exports.__esModule = true;
var graphql_1 = require("graphql");
var TOKEN_REGEX = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/;
var validate = function (value) {
    if (typeof value !== "string") {
        throw new graphql_1.GraphQLError("Value is not a valid string: ".concat(value));
    }
    if (!TOKEN_REGEX.test(value)) {
        throw new graphql_1.GraphQLError("Value is not a valid JWT Token: ".concat(value));
    }
    return value;
};
var parseLiteral = function (ast) {
    if (ast.kind !== graphql_1.Kind.STRING) {
        throw new graphql_1.GraphQLError("Query error: Can only parse string as token but got a: ".concat(ast.kind));
    }
    return ast.value;
};
var tokenScalar = new graphql_1.GraphQLScalarType({
    name: "Token",
    description: "JWT token",
    serialize: validate,
    parseValue: validate,
    parseLiteral: parseLiteral
});
exports["default"] = tokenScalar;
