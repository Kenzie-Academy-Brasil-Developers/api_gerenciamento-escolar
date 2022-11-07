import AppDataSource from "../../data-source";
import { SchoolGrades } from "../../entities/schoolGrades.entity";

const schlGrdService = async (id: string) => {
  const schlgrdRepository = AppDataSource.getRepository(SchoolGrades);

  const schlGrd = await schlgrdRepository.find();
  //const history = retHist.find((hist) => hist.id === id)

  // if(!history){
  // throw new appError("Invalid student", 404)
  // }

  return schlGrd;
};

export default schlGrdService;
