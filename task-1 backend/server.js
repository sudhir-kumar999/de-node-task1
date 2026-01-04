import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
dotenv.config();

const runServer = async () => {
  const db = await connectDB();
  app.locals.db = db;

  app.listen(process.env.PORT, () => {
    console.log(`server is ruuning of PORT ${process.env.PORT}`);
  });
};
runServer();
