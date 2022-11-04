import express from "express";
import "reflect-metadata";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();

app.use(express.json());


app.use(handleErrorMiddleware);

export default app;
