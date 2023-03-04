import mongoose from "mongoose";

export const connect = (cb: () => void) => {
  mongoose
    .connect(process.env.MONGO_URL || "")
    .then(() => {
      cb();
    })
    .catch((err) => console.log(err));
};
