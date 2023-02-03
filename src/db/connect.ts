import mongoose from "mongoose";


export const connectDB = async () => {
  
  const mongourl = process.env.MONGOURL || "mongodb://127.0.0.1:27017/taskmanager";
  mongoose.set('strictQuery', false);
  return mongoose.connect(mongourl);

};