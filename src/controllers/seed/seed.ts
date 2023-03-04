import { Response, Request } from "express";
import initialData from "../../utils/seed";
import UserModel from "../../models/user";

const seedController = async (
  req: Request,
  res: Response<{ message: string }>
) => {
  const users = (await initialData).users;

  await UserModel.deleteMany();
  await UserModel.insertMany(users);

  return res.status(201).json({ message: "Successfull" });
};

export default seedController;
