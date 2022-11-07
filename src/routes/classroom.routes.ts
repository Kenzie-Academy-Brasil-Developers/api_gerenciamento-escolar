import { Router } from "express";
import {
  createClassroomController,
  deleteClassroomController,
  listClassroomController,
  listClassroomTeacherController,
} from "../controllers/classroom/createClassroom.controllers";
import { authUser } from "../middlewares/authUser.middleware";

export const classRoomRoutes = Router();

classRoomRoutes.post("", authUser, createClassroomController);

classRoomRoutes.get("", listClassroomController);

classRoomRoutes.get("/:id/teacher", authUser, listClassroomTeacherController);

classRoomRoutes.get("/:id", authUser, deleteClassroomController);
