import express from "express";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import routesSchlGrd from "./routes/SchlGrades.routes";

const app = express();

app.use(express.json());

app.use(handleErrorMiddleware);
app.use(routesSchlGrd);

export default app;
