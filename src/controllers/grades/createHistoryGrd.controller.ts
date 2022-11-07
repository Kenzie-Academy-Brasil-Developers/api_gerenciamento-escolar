import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import histGrdCreateService from "../../services/grades/createHistoryGrd.service";
import { GradesHistory } from "../../entities/gradesHistory.entity";



const historyCreateController = async (req: Request, res: Response) => {
    const data: GradesHistory = req.body;
    const newGrd = await histGrdCreateService(data);
    return res.status(201).json(instanceToPlain(newGrd))
  };
  
  export default historyCreateController;