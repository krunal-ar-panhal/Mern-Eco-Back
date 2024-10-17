import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/userRoute.js";

const app = express();
config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello ji");
});
