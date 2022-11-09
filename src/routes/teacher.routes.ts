import { Router } from "express";
import createTeacherController from "../controllers/teacher/createTeacher.controller";
import createTeacherClassroomController from "../controllers/teacher/createTeacherClassroom.controller";
import deleteTeacherController from "../controllers/teacher/deleteTeacher.controller";
import deleteTeacherClassroomController from "../controllers/teacher/deleteTeacherClassroom.controller";
import listTeachersController from "../controllers/teacher/listTechers.controller";
import updateTeacherController from "../controllers/teacher/updateTeacher.controller";
import updateTeacherClassroomController from "../controllers/teacher/updateTeacherClassroom.controller";
import { authUser } from "../middlewares/authUser.middleware";
import permissionUserMiddeware from "../middlewares/permissionUser.middleware";

import testListTeacherClassroomController from "../controllers/teacher/testListTeacherClassroom.controller";
const teacherRoutes = Router();

teacherRoutes.post("", authUser, createTeacherController);
teacherRoutes.get("", authUser, listTeachersController);
teacherRoutes.patch(
  "/:id",
  authUser,
  permissionUserMiddeware,
  updateTeacherController
);
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
teacherRoutes.patch(
  "/classroom/:id",
  authUser,
  permissionUserMiddeware,
  updateTeacherClassroomController
);
teacherRoutes.get("/classroom/test", testListTeacherClassroomController);
teacherRoutes.delete(
  "/classroom/:id",
  authUser,
  permissionUserMiddeware,
  deleteTeacherClassroomController
);
export default teacherRoutes;
