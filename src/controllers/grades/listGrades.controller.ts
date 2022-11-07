import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import schlGrdService from "../../services/grades/listGrade.service";

const schlGrdController = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const schlGrd = await schlGrdService(id)
        return res.json(instanceToPlain(schlGrd))
        
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).send({
                "error": error.name,
                "message": error.message
            })
        }
    }
}

export default schlGrdController