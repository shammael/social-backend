import { Types } from "mongoose";

const checkIDModel = (id: string) => {
  return Types.ObjectId.isValid(id);
};

export default checkIDModel;
