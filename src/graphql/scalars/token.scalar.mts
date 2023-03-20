import { GraphQLError, GraphQLScalarType, Kind, ValueNode } from "graphql";

const TOKEN_REGEX =
  /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/;

const validate = (value: unknown) => {
  if (typeof value !== "string") {
    throw new GraphQLError(`Value is not a valid string: ${value}`);
  }
  if (!TOKEN_REGEX.test(value)) {
    throw new GraphQLError(`Value is not a valid JWT Token: ${value}`);
  }
  return value;
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(
      `Query error: Can only parse string as token but got a: ${ast.kind}`
    );
  }

  return ast.value;
};

const tokenScalar = new GraphQLScalarType({
  name: "Token",
  description: "JWT token",
  serialize: validate,
  parseValue: validate,
  parseLiteral,
});

export default tokenScalar;
