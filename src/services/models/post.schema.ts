import mongoose, { Document, PaginateModel, Schema, Types } from "mongoose";

import paginate from "mongoose-paginate-v2";
import IPost from "../../interfaces/post";

interface PostDocument extends Document, Omit<IPost, "_id"> {}

// export enum PostLevel {
//   First = 'first',
//   Second = 'second',
//   Third = 'third'
// }

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        user: { type: Types.ObjectId, ref: "user", required: true },
        reaction: {
          type: String,
          enum: {
            values: ["like", "haha", "love"],
            message: "{VALUE} is not a valid reaction type",
          },
        },
      },
    ],
    picturePath: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "pending", "disabled"],
        message: "{VALUE} is not a valid status",
        default: "active",
      },
      required: true,
    },
    level: {
      type: String,
      enum: {
        values: ["first", "second", "third"],
        message: "{VALUE} is not a valid level",
        required: true,
      },
      required: true,
    },
    userID: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(paginate);

const model = mongoose.model<PostDocument, PaginateModel<PostDocument>>(
  "post",
  PostSchema
);

export default model;
