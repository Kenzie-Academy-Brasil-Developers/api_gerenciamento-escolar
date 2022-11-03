import express from "express";
import "reflect-metadata";
import routesSchoolMaterials from "./routes/schoolMaterials.routes"
import handleErrorMiddleware from "./middlewares/handleError.middleware";


const app = express();

app.use(express.json());
app.use(routesSchoolMaterials)

app.use(handleErrorMiddleware);

export default app;
