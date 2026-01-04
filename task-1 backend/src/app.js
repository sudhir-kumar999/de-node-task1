import express from "express";
const app = express();
import eventRoutes from "./routes/eventRoutes.js";

app.use(express.json());
app.use("/api/v3/app",eventRoutes)

export default app;
