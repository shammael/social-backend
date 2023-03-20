import { ValueNode } from "graphql";
import { GraphQLError } from "graphql";
import { GraphQLScalarType, Kind } from "graphql";

const EMAIL_ADDRESS_REGEX =
  /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const validate = (value: unknown) => {
  if (typeof value !== "string") {
    throw new GraphQLError(`Value is not a valid string: ${value}`);
  }
  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new GraphQLError(`Value is not a valid email address: ${value}`);
  }

  return value;
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(
      `Query error: Can only parse string as email addresses but got a: ${ast.kind}`
    );
  }
  return ast.value;
};

const emailScalar = new GraphQLScalarType({
  name: "Email",
  description: "It's a field for an email address",
  serialize: (value) => validate(value),
  parseLiteral: (ast) => parseLiteral(ast),
  parseValue: (value) => validate(value),
});

export default emailScalar;
