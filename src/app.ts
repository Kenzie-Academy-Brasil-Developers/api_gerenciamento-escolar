import express from "express";
import "express-async-errors";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import routesSchlGrd from "./routes/SchlGrades.routes";

const app = express();

app.use(express.json());

app.use("", routesSchlGrd);
app.use(handleErrorMiddleware);

export default app;
