import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established successfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default dbConnect;
