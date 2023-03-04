import mongoose, { PaginateModel, Schema, Types } from "mongoose";
import IPost from "../interfaces/post";
import paginate from "mongoose-paginate-v2";

interface PostDocument extends Document, IPost {}

const PostSchema = new Schema(
  {
    commentFrom: {
      type: Types.ObjectId,
      ref: "comment",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
        required: true,
      },
    ],
    picturePath: {
      type: String,
      trim: true,
    },
    userID: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "pending", "disabled"],
        message: "{VALUE} is not a valid status",
        required: true,
        default: "active",
      },
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
