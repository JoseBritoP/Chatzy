import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    if(!process.env.MONGO_URI) throw new Error(`Database uri is missing`)
    const connection = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`
    console.log(`Mongo connect in ${url}`)
  } catch (error:any) {
    console.log(error.message)
    process.exit(1)
  }
}