import { Router } from "express";
import schlGrdCreateController from "../controllers/schoolGrades/createSchlGrd.controller";


const routesSchlGrd = Router();

routesSchlGrd.post("/schoolGrade", schlGrdCreateController);

export default routesSchlGrd;
