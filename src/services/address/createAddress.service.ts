import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { appError } from "../../errors/appError";

const createAddressService = async (data: Address) => {
  const { district, cep, number, country, state } = data;

  const addressRepository = AppDataSource.getRepository(Address);

  const addressAlreadyExist = await addressRepository.findOneBy({
    cep: cep,
    number: number,
  });

  if (addressAlreadyExist) {
    throw new appError(
      "Two properties cannot be registered with the same address",
      400
    );
  }

  if (state.length > 2) {
    throw new appError(
      "Properties with the state field greater than 2 digits cannot be registered",
      400
    );
  }

  if (cep.length > 8) {
    throw new appError(
      "Properties with zipCode field longer than 8 digits cannot be registered",
      400
    );
  }

  const newAddress = addressRepository.create({
    district,
    cep,
    number,
    country,
    state,
  });

  await addressRepository.save(newAddress);

  return {
    status: 201,
    message: "address registered successfully",
    data: newAddress,
  };
};
export default createAddressService;
