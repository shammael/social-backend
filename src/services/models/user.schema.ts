import {
  Schema,
  Types,
  model as mongooseModel,
  Document,
  PaginateModel,
  Model,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { User } from "../../graphql/generated/types.js";
import checkID from "../utils/checkID.js";

interface IUserDocument
  extends Document,
    Omit<
      User & { password: string; active?: boolean; token?: string },
      "_id"
    > {}

interface IUserModel extends Model<IUserDocument> {
  validID: (id: string) => boolean;
}

const UserSchema = new Schema<
  User & { password: string; active: boolean; token?: string }
>(
  {
    firstName: {
      required: true,
      min: 3,
      max: 50,
      type: String,
    },
    lastName: {
      required: true,
      min: 3,
      max: 50,
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picturePath: {
      type: String,
    },
    online: {
      type: Boolean,
      default: false,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    token: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.static("validID", checkID);

const model = mongooseModel<
  IUserDocument,
  PaginateModel<IUserDocument> & IUserModel
>("user", UserSchema);

export default model;
