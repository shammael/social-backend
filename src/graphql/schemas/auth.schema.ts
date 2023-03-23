const authSchema = `#graphql

scalar Email
scalar Token

input loginInput {
  email: Email!
  password: String!
}

type LoginResponse {
  user: User!
  token: Token!
}

type Logout {
  message: String
}

type Mutation {
  login(input: loginInput!): LoginResponse!
  logout(id: ID!): Logout!
}

`;

export default authSchema;
