import { Request, Response } from "express";
import { ITeacherClassroom } from "../../interfaces/teacher";
import createTeacherClassroomService from "../../services/teacher/createTeacherClassroom.service";

const createTeacherClassroomController = async (
  req: Request,
  res: Response
) => {
  const data: ITeacherClassroom = req.body;
  const teacherClassroom = await createTeacherClassroomService(data);
  return res.status(201).json(teacherClassroom);
};
export default createTeacherClassroomController;
