import express from "express";
import "express-async-errors";
import "reflect-metadata";

import handleErrorMiddleware from "./middlewares/handleError.middleware";
import routesSchlGrd from "./routes/SchlGrades.routes";

import addressRoutes from "./routes/address.routes";
import professionalRoutes from "./routes/professionals.routes";
import teacherRoutes from "./routes/teacher.routes";
import studentRoutes from "./routes/students.routes";
import { classRoomRoutes } from "./routes/classroom.routes";
import sessionRoutes from "./routes/session.routes";

const app = express();

app.use(express.json());

app.use("", routesSchlGrd);
app.use("/professionals", professionalRoutes);
app.use("/address", addressRoutes);
app.use("/teacher", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/classroom", classRoomRoutes);
app.use("/login", sessionRoutes);

app.use(handleErrorMiddleware);

export default app;
