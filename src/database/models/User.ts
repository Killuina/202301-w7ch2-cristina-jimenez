import { model, Schema } from "mongoose";

const userSchema = new Schema({
  avatar: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const User = model("User", userSchema, "users");

export default User;
