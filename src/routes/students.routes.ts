import { Router } from "express";
import createStudentController from "../controllers/students/createStudent.controller";
import deleteStudentController from "../controllers/students/deleteStudent.controller";
import listAllStudentsController from "../controllers/students/listAllStudents.controller";
import updateStudentController from "../controllers/students/updateStudent.controller";

const router = Router();

router.post("", createStudentController);
router.get("", listAllStudentsController);
router.patch("/:id", updateStudentController);
router.delete("/:id", deleteStudentController);

export default router;
