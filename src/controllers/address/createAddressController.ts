import { Request, Response } from "express";
import { Address } from "../../entities/address.entity";
import createAddressService from "../../services/address/createAddress.service";

const createAddressController = async (req: Request, res: Response) => {
  const data: Address = req.body;
  const newAddress = await createAddressService(data);
  return res.status(201).json(newAddress);
};
export default createAddressController;
