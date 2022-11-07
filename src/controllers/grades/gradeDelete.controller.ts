import { Request, Response } from "express";
import grdDeleteService from "../../services/grades/gradeDelete.service";

const grdDeleteController = async (req: Request, res: Response) => {
    const {id} = req.params
    
        const deletedId =  await grdDeleteService(id)
        
        return res.status(204).json({deletedId, message: "Grade's student deleted with sucess!"}) 

   
        
    
}

export default grdDeleteController