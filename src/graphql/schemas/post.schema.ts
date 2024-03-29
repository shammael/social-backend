const postSchema = `#graphql

scalar Date

enum PostStatus {
  pending
  active
  disabled
}

enum PostLevel {
  first
  second
  third
}

enum LikeReaction {
  love
  like
  haha
}

input GetPostsInput {
  page: Int!
  limit: Int
}

input ToggleLikePostInput {
  id: ID!
  reaction: LikeReaction
}

type PostList implements Paginate {
  docs: [Post]!
  totalDocs: Int!
  limit: Int!
  hasPrevPage: Boolean!
  hasNextPage: Boolean!
  page: Int
  totalPages: Int!
  offset: Int!
  prevPage: Int!
  nextPage: Int!
  pagingCounter: Int!
}

type Likes {
  userID: ID!
  reaction: LikeReaction!
}

type ToggleLike {
  message: String
}

type Post {
  _id: ID!
  userID: ID!
  content: String
  likes: [Likes]!
  createdAt: Date!
  updatedAt: Date!
  status: PostStatus!
  level: PostLevel!
  picturePath: String
}

type Query {
  posts(input: GetPostsInput!): PostList!
  post(id: ID!): Post!
}

type Mutation {
  deletePost(id: ID!): Post!
  toggleLikePost(input: ToggleLikePostInput!): ToggleLike!
}

`;

export default postSchema;
