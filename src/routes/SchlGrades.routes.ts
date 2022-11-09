import { Router } from "express";
import historyCreateController from "../controllers/grades/createHistoryGrd.controller";
import schlgrdCreateController from "../controllers/grades/createSchoolGrades.controller";
import grdDeleteController from "../controllers/grades/gradeDelete.controller";
import schlGrdController from "../controllers/grades/listGrades.controller";
import histListController from "../controllers/grades/listHistory.controller";
import gradeUpdateController from "../controllers/grades/updateGrade.controller";
import { authUser } from "../middlewares/authUser.middleware";

const routesSchlGrd = Router();

routesSchlGrd.post("/grade", historyCreateController);
routesSchlGrd.get("/gradeHistory/student/:id", histListController);
routesSchlGrd.patch("/gradeHistory/student/:id", gradeUpdateController);
routesSchlGrd.delete("/gradeHistory/student/:id", grdDeleteController);

routesSchlGrd.post("/schoolGrade", authUser, schlgrdCreateController);
routesSchlGrd.get("/schoolGrade", schlGrdController);

export default routesSchlGrd;
