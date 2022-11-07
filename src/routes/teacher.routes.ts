import { Router } from "express";
import createTeacherController from "../controllers/teacher/createTeacher.controller";
import deleteTeacherController from "../controllers/teacher/deleteTeacher.controller";
import listTeachersController from "../controllers/teacher/listTechers.controller";
import updateTeacherController from "../controllers/teacher/updateTeacher.controller";

const teacherRoutes = Router();

teacherRoutes.post("", createTeacherController);
teacherRoutes.get("", listTeachersController);
teacherRoutes.patch("/:id", updateTeacherController);
teacherRoutes.delete("/:id", deleteTeacherController);

export default teacherRoutes;
