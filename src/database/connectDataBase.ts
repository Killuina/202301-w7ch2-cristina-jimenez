import mongoose from "mongoose";

const connectDataBase = async (url: string) => {
  mongoose.set("strictQuery", false);

  mongoose.set("debug", true);

  try {
    await mongoose.connect(url);
  } catch (error) {
    throw new Error("Error while connecting to data base.");
  }
};

export default connectDataBase;
