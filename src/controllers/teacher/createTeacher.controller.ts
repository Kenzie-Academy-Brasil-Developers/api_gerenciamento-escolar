import { Request, Response } from "express";
import { Teachers } from "../../entities/teachers.entity";
import createTeacherService from "../../services/teacher/createTeacher.service";
import { instanceToPlain } from "class-transformer";

const createTeacherController = async (req: Request, res: Response) => {
  const data: Teachers = req.body;
  const newTeacher = await createTeacherService(data);
  return res.status(201).json(instanceToPlain(newTeacher));
};

export default createTeacherController;
