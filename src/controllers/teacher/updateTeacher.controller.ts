import { Request, Response } from "express";
import { ITeacherUpdate } from "../../interfaces/teacher";
import updateTeacherService from "../../services/teacher/updateTeacher.service";

const updateTeacherController = async (req: Request, res: Response) => {
  const data: ITeacherUpdate = req.body;
  const { id } = req.params;
  const updatedTeacher = await updateTeacherService(data, id);
  return res.status(200).json(updatedTeacher);
};

export default updateTeacherController;
