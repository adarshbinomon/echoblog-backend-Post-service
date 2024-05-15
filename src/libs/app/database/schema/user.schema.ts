import mongoose from "mongoose";

const accountTypeEnum = ["private", "public"];
const genderEnum = ["Male", "Female", "Other"];

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  userName: {
    type: String,
  },
  profilePicture: {
    type: String
  }
  
});

const User = mongoose.model("User", userSchema);

export { User };
