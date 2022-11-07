import { Request, Response } from "express";
import deleteTeacherService from "../../services/teacher/deleteTeacher.service";

const deleteTeacherController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTeacher = await deleteTeacherService(id);
  return res.status(200).json(deletedTeacher);
};
export default deleteTeacherController;
