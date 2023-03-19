import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import ExpressContext from "../../interfaces/context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Email: any;
  Token: any;
};

export type BadRequestError = Error & {
  __typename?: "BadRequestError";
  code: Scalars["Int"];
  message: Scalars["String"];
  messages?: Maybe<Array<ErrorMessagesType>>;
  name: ErrorName;
};

export type Error = {
  code: Scalars["Int"];
  message: Scalars["String"];
  messages?: Maybe<Array<ErrorMessagesType>>;
  name: ErrorName;
};

export type ErrorMessagesType = {
  __typename?: "ErrorMessagesType";
  field: Scalars["String"];
  message: Scalars["String"];
};

export enum ErrorName {
  Badrequest = "BADREQUEST",
  Forbidden = "FORBIDDEN",
  Internalservererror = "INTERNALSERVERERROR",
  Unauthorized = "UNAUTHORIZED",
}

export type ForbiddenError = Error & {
  __typename?: "ForbiddenError";
  code: Scalars["Int"];
  message: Scalars["String"];
  messages?: Maybe<Array<ErrorMessagesType>>;
  name: ErrorName;
};

export type GetPostsInput = {
  limit?: InputMaybe<Scalars["Int"]>;
  page: Scalars["Int"];
};

export type InternalServerError = Error & {
  __typename?: "InternalServerError";
  code: Scalars["Int"];
  message: Scalars["String"];
  messages?: Maybe<Array<ErrorMessagesType>>;
  name: ErrorName;
};

export enum LikeReaction {
  Haha = "haha",
  Like = "like",
  Love = "love",
}

export type Likes = {
  __typename?: "Likes";
  reaction: LikeReaction;
  userID: Scalars["ID"];
};

export type LoginData = {
  __typename?: "LoginData";
  token: Scalars["Token"];
  user: User;
};

export type LoginResponse = BadRequestError | InternalServerError | LoginData;

export type Logout = {
  __typename?: "Logout";
  message?: Maybe<Scalars["String"]>;
};

export type LogoutResponse = ForbiddenError | InternalServerError | Logout;

export type Mutation = {
  __typename?: "Mutation";
  deletePost: PostRespose;
  login: LoginResponse;
  logout: LogoutResponse;
  toggleLikePost: ToogleLikeResponse;
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationLogoutArgs = {
  id: Scalars["ID"];
};

export type MutationToggleLikePostArgs = {
  input: ToggleLikePostInput;
};

export type Paginate = {
  hasNextPage: Scalars["Boolean"];
  hasPrevPage: Scalars["Boolean"];
  limit: Scalars["Int"];
  nextPage?: Maybe<Scalars["Int"]>;
  offset: Scalars["Int"];
  page?: Maybe<Scalars["Int"]>;
  pagingCounter: Scalars["Int"];
  prevPage?: Maybe<Scalars["Int"]>;
  totalDocs: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type Post = {
  __typename?: "Post";
  _id: Scalars["ID"];
  content?: Maybe<Scalars["String"]>;
  createdAt: Scalars["Date"];
  level: PostLevel;
  likes: Array<Maybe<Likes>>;
  picturePath?: Maybe<Scalars["String"]>;
  status: PostStatus;
  updatedAt: Scalars["Date"];
  userID: Scalars["ID"];
};

export enum PostLevel {
  First = "first",
  Second = "second",
  Third = "third",
}

export type PostList = Paginate & {
  __typename?: "PostList";
  docs: Array<Maybe<Post>>;
  hasNextPage: Scalars["Boolean"];
  hasPrevPage: Scalars["Boolean"];
  limit: Scalars["Int"];
  nextPage: Scalars["Int"];
  offset: Scalars["Int"];
  page?: Maybe<Scalars["Int"]>;
  pagingCounter: Scalars["Int"];
  prevPage: Scalars["Int"];
  totalDocs: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type PostRespose = BadRequestError | InternalServerError | Post;

export enum PostStatus {
  Active = "active",
  Disabled = "disabled",
  Pending = "pending",
}

export type PostsRespose = InternalServerError | PostList;

export type Query = {
  __typename?: "Query";
  post: PostRespose;
  posts: PostsRespose;
};

export type QueryPostArgs = {
  id: Scalars["ID"];
};

export type QueryPostsArgs = {
  input: GetPostsInput;
};

export type ToggleLike = {
  __typename?: "ToggleLike";
  message?: Maybe<Scalars["String"]>;
};

export type ToggleLikePostInput = {
  id: Scalars["ID"];
  reaction?: InputMaybe<LikeReaction>;
};

export type ToogleLikeResponse =
  | BadRequestError
  | InternalServerError
  | ToggleLike;

export type UnauthorizedError = Error & {
  __typename?: "UnauthorizedError";
  code: Scalars["Int"];
  message: Scalars["String"];
  messages?: Maybe<Array<ErrorMessagesType>>;
  name: ErrorName;
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  email: Scalars["Email"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  location?: Maybe<Scalars["String"]>;
  occupation?: Maybe<Scalars["String"]>;
  online: Scalars["Boolean"];
  picturePath?: Maybe<Scalars["String"]>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  LoginResponse: BadRequestError | InternalServerError | LoginData;
  LogoutResponse: ForbiddenError | InternalServerError | Logout;
  PostRespose: BadRequestError | InternalServerError | Post;
  PostsRespose: InternalServerError | PostList;
  ToogleLikeResponse: BadRequestError | InternalServerError | ToggleLike;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BadRequestError: ResolverTypeWrapper<BadRequestError>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Email: ResolverTypeWrapper<Scalars["Email"]>;
  Error:
    | ResolversTypes["BadRequestError"]
    | ResolversTypes["ForbiddenError"]
    | ResolversTypes["InternalServerError"]
    | ResolversTypes["UnauthorizedError"];
  ErrorMessagesType: ResolverTypeWrapper<ErrorMessagesType>;
  ErrorName: ErrorName;
  ForbiddenError: ResolverTypeWrapper<ForbiddenError>;
  GetPostsInput: GetPostsInput;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  InternalServerError: ResolverTypeWrapper<InternalServerError>;
  LikeReaction: LikeReaction;
  Likes: ResolverTypeWrapper<Likes>;
  LoginData: ResolverTypeWrapper<LoginData>;
  LoginResponse: ResolverTypeWrapper<ResolversUnionTypes["LoginResponse"]>;
  Logout: ResolverTypeWrapper<Logout>;
  LogoutResponse: ResolverTypeWrapper<ResolversUnionTypes["LogoutResponse"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Paginate: ResolversTypes["PostList"];
  Post: ResolverTypeWrapper<Post>;
  PostLevel: PostLevel;
  PostList: ResolverTypeWrapper<PostList>;
  PostRespose: ResolverTypeWrapper<ResolversUnionTypes["PostRespose"]>;
  PostStatus: PostStatus;
  PostsRespose: ResolverTypeWrapper<ResolversUnionTypes["PostsRespose"]>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ToggleLike: ResolverTypeWrapper<ToggleLike>;
  ToggleLikePostInput: ToggleLikePostInput;
  Token: ResolverTypeWrapper<Scalars["Token"]>;
  ToogleLikeResponse: ResolverTypeWrapper<
    ResolversUnionTypes["ToogleLikeResponse"]
  >;
  UnauthorizedError: ResolverTypeWrapper<UnauthorizedError>;
  User: ResolverTypeWrapper<User>;
  loginInput: LoginInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BadRequestError: BadRequestError;
  Boolean: Scalars["Boolean"];
  Date: Scalars["Date"];
  Email: Scalars["Email"];
  Error:
    | ResolversParentTypes["BadRequestError"]
    | ResolversParentTypes["ForbiddenError"]
    | ResolversParentTypes["InternalServerError"]
    | ResolversParentTypes["UnauthorizedError"];
  ErrorMessagesType: ErrorMessagesType;
  ForbiddenError: ForbiddenError;
  GetPostsInput: GetPostsInput;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  InternalServerError: InternalServerError;
  Likes: Likes;
  LoginData: LoginData;
  LoginResponse: ResolversUnionTypes["LoginResponse"];
  Logout: Logout;
  LogoutResponse: ResolversUnionTypes["LogoutResponse"];
  Mutation: {};
  Paginate: ResolversParentTypes["PostList"];
  Post: Post;
  PostList: PostList;
  PostRespose: ResolversUnionTypes["PostRespose"];
  PostsRespose: ResolversUnionTypes["PostsRespose"];
  Query: {};
  String: Scalars["String"];
  ToggleLike: ToggleLike;
  ToggleLikePostInput: ToggleLikePostInput;
  Token: Scalars["Token"];
  ToogleLikeResponse: ResolversUnionTypes["ToogleLikeResponse"];
  UnauthorizedError: UnauthorizedError;
  User: User;
  loginInput: LoginInput;
};

export type BadRequestErrorResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["BadRequestError"] = ResolversParentTypes["BadRequestError"]
> = {
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["ErrorMessagesType"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["ErrorName"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface EmailScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Email"], any> {
  name: "Email";
}

export type ErrorResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]
> = {
  __resolveType: TypeResolveFn<
    | "BadRequestError"
    | "ForbiddenError"
    | "InternalServerError"
    | "UnauthorizedError",
    ParentType,
    ContextType
  >;
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["ErrorMessagesType"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["ErrorName"], ParentType, ContextType>;
};

export type ErrorMessagesTypeResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["ErrorMessagesType"] = ResolversParentTypes["ErrorMessagesType"]
> = {
  field?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForbiddenErrorResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["ForbiddenError"] = ResolversParentTypes["ForbiddenError"]
> = {
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["ErrorMessagesType"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["ErrorName"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalServerErrorResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["InternalServerError"] = ResolversParentTypes["InternalServerError"]
> = {
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["ErrorMessagesType"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["ErrorName"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Likes"] = ResolversParentTypes["Likes"]
> = {
  reaction?: Resolver<ResolversTypes["LikeReaction"], ParentType, ContextType>;
  userID?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginDataResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["LoginData"] = ResolversParentTypes["LoginData"]
> = {
  token?: Resolver<ResolversTypes["Token"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["LoginResponse"] = ResolversParentTypes["LoginResponse"]
> = {
  __resolveType: TypeResolveFn<
    "BadRequestError" | "InternalServerError" | "LoginData",
    ParentType,
    ContextType
  >;
};

export type LogoutResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Logout"] = ResolversParentTypes["Logout"]
> = {
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutResponseResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["LogoutResponse"] = ResolversParentTypes["LogoutResponse"]
> = {
  __resolveType: TypeResolveFn<
    "ForbiddenError" | "InternalServerError" | "Logout",
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  deletePost?: Resolver<
    ResolversTypes["PostRespose"],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, "id">
  >;
  login?: Resolver<
    ResolversTypes["LoginResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  logout?: Resolver<
    ResolversTypes["LogoutResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLogoutArgs, "id">
  >;
  toggleLikePost?: Resolver<
    ResolversTypes["ToogleLikeResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationToggleLikePostArgs, "input">
  >;
};

export type PaginateResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Paginate"] = ResolversParentTypes["Paginate"]
> = {
  __resolveType: TypeResolveFn<"PostList", ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPrevPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  offset?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  pagingCounter?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  totalDocs?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type PostResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  level?: Resolver<ResolversTypes["PostLevel"], ParentType, ContextType>;
  likes?: Resolver<
    Array<Maybe<ResolversTypes["Likes"]>>,
    ParentType,
    ContextType
  >;
  picturePath?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes["PostStatus"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  userID?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostListResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["PostList"] = ResolversParentTypes["PostList"]
> = {
  docs?: Resolver<
    Array<Maybe<ResolversTypes["Post"]>>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPrevPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  nextPage?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  pagingCounter?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  prevPage?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalDocs?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResposeResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["PostRespose"] = ResolversParentTypes["PostRespose"]
> = {
  __resolveType: TypeResolveFn<
    "BadRequestError" | "InternalServerError" | "Post",
    ParentType,
    ContextType
  >;
};

export type PostsResposeResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["PostsRespose"] = ResolversParentTypes["PostsRespose"]
> = {
  __resolveType: TypeResolveFn<
    "InternalServerError" | "PostList",
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  post?: Resolver<
    ResolversTypes["PostRespose"],
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, "id">
  >;
  posts?: Resolver<
    ResolversTypes["PostsRespose"],
    ParentType,
    ContextType,
    RequireFields<QueryPostsArgs, "input">
  >;
};

export type ToggleLikeResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["ToggleLike"] = ResolversParentTypes["ToggleLike"]
> = {
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TokenScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Token"], any> {
  name: "Token";
}

export type ToogleLikeResponseResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["ToogleLikeResponse"] = ResolversParentTypes["ToogleLikeResponse"]
> = {
  __resolveType: TypeResolveFn<
    "BadRequestError" | "InternalServerError" | "ToggleLike",
    ParentType,
    ContextType
  >;
};

export type UnauthorizedErrorResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["UnauthorizedError"] = ResolversParentTypes["UnauthorizedError"]
> = {
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["ErrorMessagesType"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["ErrorName"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = ExpressContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["Email"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  occupation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  online?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  picturePath?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ExpressContext> = {
  BadRequestError?: BadRequestErrorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  ErrorMessagesType?: ErrorMessagesTypeResolvers<ContextType>;
  ForbiddenError?: ForbiddenErrorResolvers<ContextType>;
  InternalServerError?: InternalServerErrorResolvers<ContextType>;
  Likes?: LikesResolvers<ContextType>;
  LoginData?: LoginDataResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Logout?: LogoutResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Paginate?: PaginateResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostList?: PostListResolvers<ContextType>;
  PostRespose?: PostResposeResolvers<ContextType>;
  PostsRespose?: PostsResposeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ToggleLike?: ToggleLikeResolvers<ContextType>;
  Token?: GraphQLScalarType;
  ToogleLikeResponse?: ToogleLikeResponseResolvers<ContextType>;
  UnauthorizedError?: UnauthorizedErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
