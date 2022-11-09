import { Request, Response } from "express";
import deleteTeacherClassroomService from "../../services/teacher/deleteTeacherClassroom.service";

const deleteTeacherClassroomController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const deleted = await deleteTeacherClassroomService(id);
  return res.status(204).json(deleted);
};
export default deleteTeacherClassroomController;
