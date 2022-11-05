import { Request, Response } from "express";
import { Professionals } from "../../entities/professionals.entity";
import createProfessionalService from "../../services/professionals/createProfessional.service";
import { instanceToPlain } from "class-transformer";

const createProfessionalController = async (req: Request, res: Response) => {
  const data: Professionals = req.body;
  const newProfessional = await createProfessionalService(data);
  return res.status(201).json(instanceToPlain(newProfessional));
};
export default createProfessionalController;
