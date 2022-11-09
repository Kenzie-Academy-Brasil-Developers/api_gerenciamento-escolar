import { Router } from "express";
import createStudentController from "../controllers/students/createStudent.controller";
import deleteStudentController from "../controllers/students/deleteStudent.controller";
import listAllStudentsController from "../controllers/students/listAllStudents.controller";
import updateStudentController from "../controllers/students/updateStudent.controller";
import { authUser } from "../middlewares/authUser.middleware";
import permissionUserMiddeware from "../middlewares/permissionUser.middleware";

const router = Router();

router.post("", authUser, permissionUserMiddeware, createStudentController);
router.get("", authUser, permissionUserMiddeware, listAllStudentsController);
router.patch(
  "/:id",
  authUser,
  permissionUserMiddeware,
  updateStudentController
);
router.delete(
  "/:id",
  authUser,
  permissionUserMiddeware,
  deleteStudentController
);

export default router;
