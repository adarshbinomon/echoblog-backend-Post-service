import mongoose from "mongoose";


const connectionString: string = process.env.MONGODB_URL || "";

const connectDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the Post database");
  } catch (error) {
    console.error("Error connecting to the Post database");
    process.exit(1);
  }
};

export default connectDb;
