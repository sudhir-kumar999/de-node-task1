import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export const connectDB = async () => {
  await client.connect();
  console.log("Database connected");
  return client.db();
};
