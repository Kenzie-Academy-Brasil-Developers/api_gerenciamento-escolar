import { Router } from "express";
import createTeacherController from "../controllers/teacher/createTeacher.controller";
import createTeacherClassroomController from "../controllers/teacher/createTeacherClassroom.controller";
import deleteTeacherController from "../controllers/teacher/deleteTeacher.controller";
import listTeachersController from "../controllers/teacher/listTechers.controller";
import updateTeacherController from "../controllers/teacher/updateTeacher.controller";
import { authUser } from "../middlewares/authUser.middleware";
import permissionUserMiddeware from "../middlewares/permissionUser.middleware";

const teacherRoutes = Router();

teacherRoutes.post("", authUser, createTeacherController);
teacherRoutes.get("", authUser, listTeachersController);
teacherRoutes.patch("/:id", authUser, updateTeacherController);
teacherRoutes.delete(
  "/:id",
  authUser,
  permissionUserMiddeware,
  deleteTeacherController
);

teacherRoutes.post(
  "/classroom",
  authUser,
  permissionUserMiddeware,
  createTeacherClassroomController
);
teacherRoutes.get("/classroom", listTeachersController);
export default teacherRoutes;
