import { Request, Response } from "express";
import listTeacherClassroomService from "../../services/teacher/listTeacherClassroom.service";

const listTeacherClassroomController = async (req: Request, res: Response) => {
  const retorno = await listTeacherClassroomService();
  return res.status(200).json(retorno);
};

export default listTeacherClassroomController;
