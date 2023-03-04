import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connect } from "./utils/db";
import appRouter from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import use from "./utils/express/use";

/* 
  The fact that we use ES Module, __dirname and __filename doesn't exist. Only exist with comonjs
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());

app.use(cors());
// app.use(
//   "/assets",
//   express.static(path.resolve(__dirname, "", "/public/assets"))
// );

app.use("/api", appRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

connect(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
