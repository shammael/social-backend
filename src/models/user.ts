import {
  Schema,
  Types,
  model as mongooseModel,
  Document,
  PaginateModel,
  Model,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import IUser from "../interfaces/user";
import BadRequest from "../utils/errors/ExistsError.error";
import checkID, { TCheckID } from "./utils/checkID";

interface IUserDocument extends Document, IUser {}

interface IUserModel extends Model<IUserDocument> {
  validID: (id: string) => boolean;
}

const UserSchema = new Schema<IUser>(
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
    friends: [
      {
        type: Types.ObjectId,
        ref: "user",
        validate(value: string) {},
      },
    ],
    impressions: {
      type: Number,
      default: 0,
      required: true,
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    viewedProfile: {
      type: Number,
      default: 0,
      required: true,
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
