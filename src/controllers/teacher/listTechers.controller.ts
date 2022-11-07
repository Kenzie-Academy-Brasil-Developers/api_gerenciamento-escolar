import { Request, Response } from "express";
import listTeachersService from "../../services/teacher/listTeachers.service";
import { instanceToPlain } from "class-transformer";

const listTeachersController = async (req: Request, res: Response) => {
  const listTeachers = await listTeachersService();
  return res.status(200).json(instanceToPlain(listTeachers));
};
export default listTeachersController;
