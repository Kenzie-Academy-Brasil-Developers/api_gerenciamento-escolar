import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import schlGrdCreateService from "../../services/grades/createSchoolGrades.service";
import { SchoolGrades } from "../../entities/schoolGrades.entity";



const schlgrdCreateController = async (req: Request, res: Response) => {
    const data: SchoolGrades = req.body;
    const newGrd = await schlGrdCreateService(data);
    return res.status(201).json(instanceToPlain(newGrd))
  };
  
  export default schlgrdCreateController;