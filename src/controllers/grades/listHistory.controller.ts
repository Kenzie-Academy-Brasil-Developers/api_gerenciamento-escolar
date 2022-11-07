import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listHistPropService from "../../services/grades/listHistory.service";

const histListController = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const hist = await listHistPropService(id)
        return res.json(instanceToPlain(hist))
        
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).send({
                "error": error.name,
                "message": error.message
            })
        }
    }
}

export default histListController