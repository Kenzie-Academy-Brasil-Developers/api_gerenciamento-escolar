import { Router } from "express";
import {
  createClassroomController,
  deleteClassroomController,
  listClassroomController,
  listClassroomTeacherController,
  updateClassroomController,
} from "../controllers/classroom/createClassroom.controllers";
import { authUser } from "../middlewares/authUser.middleware";
import permissionUserMiddeware from "../middlewares/permissionUser.middleware";

export const classRoomRoutes = Router();

classRoomRoutes.post("", createClassroomController);

classRoomRoutes.get("", listClassroomController);

classRoomRoutes.get("/:id/teacher", authUser, listClassroomTeacherController);

classRoomRoutes.patch(
  "/:id",
  authUser,
  permissionUserMiddeware,
  updateClassroomController
);

classRoomRoutes.delete(
  "/:id",
  authUser,
  permissionUserMiddeware,
  deleteClassroomController
);
