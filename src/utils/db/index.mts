import mongoose from "mongoose";

const connect = (cb: () => void) => {
  mongoose
    .connect(process.env.MONGO_URL || "")
    .then(() => {
      cb();
    })
    .catch((err) => console.log(err));
};

export default connect;
