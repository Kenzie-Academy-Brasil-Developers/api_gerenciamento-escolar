import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Professionals } from "../entities/professionals.entity";
import { appError } from "../errors/appError";

const permissionUserMiddeware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.body.decodifiedToken;

  const professionalRepository = AppDataSource.getRepository(Professionals);

  const professional = await professionalRepository.findOneBy({
    id: userToken.id,
  });

  if (!professional?.permission) {
    throw new appError("permission denied, not adm", 401);
  }

  next();
};

export default permissionUserMiddeware;
