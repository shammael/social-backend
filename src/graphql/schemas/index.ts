import { mergeTypeDefs } from "@graphql-tools/merge";
import authSchema from "./auth.schema.js";

import postSchema from "./post.schema.js";
import userSchema from "./user.schema.js";
import paginateSchema from "./paginate.schema.js";

import _ from "lodash";

const types = [authSchema, postSchema, authSchema, userSchema, paginateSchema];

export default mergeTypeDefs(types);
