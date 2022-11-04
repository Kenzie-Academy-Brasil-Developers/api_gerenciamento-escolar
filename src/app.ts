import express from "express";
import "express-async-errors";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import addressRoutes from "./routes/address.routes";
import professionalRoutes from "./routes/professionals.routes";
import teacherRoutes from "./routes/teacher.routes";

const app = express();

app.use(express.json());

app.use("/professionals", professionalRoutes);
app.use("/address", addressRoutes);
app.use("/teacher", teacherRoutes);

app.use(handleErrorMiddleware);

export default app;
