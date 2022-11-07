import { Router } from "express";
import historyCreateController from "../controllers/grades/createHistoryGrd.controller";
import schlgrdCreateController from "../controllers/grades/createSchoolGrades.controller";
import grdDeleteController from "../controllers/grades/gradeDelete.controller";
import schlGrdController from "../controllers/grades/listGrades.controller";
import histListController from "../controllers/grades/listHistory.controller";
import gradeUpdateController from "../controllers/grades/updateGrade.controller";


const routesSchlGrd = Router();

routesSchlGrd.post("/gradeHistory", historyCreateController);
routesSchlGrd.get("/gradeHistory/student", histListController);
routesSchlGrd.patch("/gradeHistory/student/:id", gradeUpdateController);
routesSchlGrd.delete("/gradeHistory/student/:id", grdDeleteController);


routesSchlGrd.post("/schoolGrade/student", schlgrdCreateController);
routesSchlGrd.get("/schoolGrade/student", schlGrdController);

export default routesSchlGrd;
