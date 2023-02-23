import mongoose from "mongoose";

const connectDataBase = async (url: string) => {
  mongoose.set("strictQuery", false);

  mongoose.set("debug", true);

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });

  try {
    await mongoose.connect(url);
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export default connectDataBase;
