import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import schlGrdCreateService from "../../services/schoolGrades/createSchlGrd.service";

const schlGrdCreateController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newUser = await schlGrdCreateService(name);

  return res.status(201).json(instanceToPlain(newUser));
};

export default schlGrdCreateController;
