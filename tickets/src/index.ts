import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    console.log("Please define JWT key");
    return;
  }

  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI must be defined");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db");
  } catch (error) {
    console.log(error);
  }

  const PORT = 3500;
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

start();
