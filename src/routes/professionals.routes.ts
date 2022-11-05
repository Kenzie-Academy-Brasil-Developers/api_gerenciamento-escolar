import { Router } from "express";
import createProfessionalController from "../controllers/professionals/createProfessionals.controller";

const professionalRoutes = Router();

professionalRoutes.post("", createProfessionalController);

export default professionalRoutes;
