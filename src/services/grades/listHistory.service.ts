import AppDataSource from "../../data-source";
import { GradesHistory } from "../../entities/gradesHistory.entity";
import { Students } from "../../entities/student.entity";


const listHistPropService = async (id: any) => {
  const histRepository = AppDataSource.getRepository(GradesHistory);
  const stdRepository = AppDataSource.getRepository(Students)
  const findStd = await stdRepository.findOneBy({id: id})
  
  const retHist = await histRepository.findOne({
    where: {
      id: findStd?.id
    },
    relations: {
      student: true
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
