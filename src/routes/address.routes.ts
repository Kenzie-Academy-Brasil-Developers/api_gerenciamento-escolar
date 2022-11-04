import { Router } from "express";
import createAddressController from "../controllers/address/createAddressController";

const addressRoutes = Router();

addressRoutes.post("", createAddressController);

export default addressRoutes;
