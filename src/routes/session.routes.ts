import { Router } from "express";
import sessionController from "../controllers/login/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("", sessionController);

export default sessionRoutes;
