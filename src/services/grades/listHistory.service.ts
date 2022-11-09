import AppDataSource from "../../data-source";
import { GradesHistory } from "../../entities/gradesHistory.entity";


const listHistPropService = async (id: string) => {
  const histRepository = AppDataSource.getRepository(GradesHistory);
    
  const retHist = await histRepository.findOne({
    where: {
      id: id
    },
    relations: {
      grade: true
    }
  })
  //const history = retHist.find((hist) => hist.id === id)

  // if(!history){
  // throw new appError("Invalid student", 404)
  // }

  return {
    status: 201,
    message: "Grades add successfully",
    data: retHist,
  };
};

export default listHistPropService;
