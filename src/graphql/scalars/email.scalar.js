"use strict";
exports.__esModule = true;
var graphql_1 = require("graphql");
var graphql_2 = require("graphql");
var EMAIL_ADDRESS_REGEX = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
var validate = function (value) {
    if (typeof value !== "string") {
        throw new graphql_1.GraphQLError("Value is not a valid string: ".concat(value));
    }
    if (!EMAIL_ADDRESS_REGEX.test(value)) {
        throw new graphql_1.GraphQLError("Value is not a valid email address: ".concat(value));
    }
    return value;
};
var parseLiteral = function (ast) {
    if (ast.kind !== graphql_2.Kind.STRING) {
        throw new graphql_1.GraphQLError("Query error: Can only parse string as email addresses but got a: ".concat(ast.kind));
    }
    return ast.value;
};
var emailScalar = new graphql_2.GraphQLScalarType({
    name: "Email",
    description: "It's a field for an email address",
    serialize: function (value) { return validate(value); },
    parseLiteral: function (ast) { return parseLiteral(ast); },
    parseValue: function (value) { return validate(value); }
});
exports["default"] = emailScalar;
