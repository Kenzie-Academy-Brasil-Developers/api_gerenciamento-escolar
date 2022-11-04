import express from "express";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import studentRoutes from "./routes/students.routes";
const app = express();

app.use(express.json());
app.use("/students", studentRoutes);
app.use(handleErrorMiddleware);

export default app;
