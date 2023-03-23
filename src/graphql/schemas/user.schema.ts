const userSchema = `#graphql

scalar Email

type Friend {
  firstName: String!
  lastName: String!
  picturePath: String
  online: Boolean!
  _id: ID!
}

type User {
  firstName: String!
  lastName: String!
  email: Email!
  picturePath: String
  location: String
  online: Boolean!
  _id: ID!
  friendList: [Friend]
}

`;

export default userSchema;
