import { Request, Response } from 'express';
//Services
import { 
    getCountry, 
    listCountry 
} from "../services/country"
//Types
import { 
    getCountryRequest, 
    listCountryRequest 
} from "../../submodules/core/types/country"
import { HttpStatusCode } from "../../submodules/core/www/statusCode";

export const getCountryHandler = async (req: Request, res: Response) => {
    const body: getCountryRequest = {
        id: req.body.id
    }
    const result = await getCountry(body);

    res.status(HttpStatusCode.OK).json(result)
};

export const listCountryHandler = async (req: Request, res: Response) => {
    const body: listCountryRequest = {
        pagination: {
            page: req.body.page,
            limit: req.body.page,
        },
        fliter: {
            minPower: req.body?.minPower,
            maxPower: req.body?.maxPower
        }
    }

    const result = await listCountry(body);

    res.status(HttpStatusCode.OK).json(result);
};