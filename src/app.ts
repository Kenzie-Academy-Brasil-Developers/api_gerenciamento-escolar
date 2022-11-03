import express from "express";
import "reflect-metadata";
import routesSchoolMaterials from "./routes/schoolMaterials.routes"


const app = express();

app.use(express.json());
app.use(routesSchoolMaterials)

export default app;
