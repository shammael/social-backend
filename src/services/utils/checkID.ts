import { Types } from "mongoose";

export type TCheckID = (id: string) => boolean;

function checkID(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export default checkID;
