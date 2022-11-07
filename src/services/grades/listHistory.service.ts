import AppDataSource from "../../data-source";
import { GradesHistory } from "../../entities/gradesHistory.entity";


const listHistPropService = async (id: string) => {
  const histRepository = AppDataSource.getRepository(GradesHistory);
    
  const retHist = await histRepository.find({
    relations: {
      grade: true
    }
  })
  //const history = retHist.find((hist) => hist.id === id)

  // if(!history){
  // throw new appError("Invalid student", 404)
  // }
console.log(retHist)
  return retHist;
};

export default listHistPropService;
