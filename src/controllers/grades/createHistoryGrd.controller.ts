import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import histGrdCreateService from "../../services/grades/createHistoryGrd.service";
import { IGradesHistoryRequest } from "../../interfaces/schoolGrades";

const historyCreateController = async (req: Request, res: Response) => {
  const data: IGradesHistoryRequest = req.body;
  const newGrd = await histGrdCreateService(data);
  return res.status(201).json(instanceToPlain(newGrd));
};

export default historyCreateController;
