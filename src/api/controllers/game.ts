import { Request, Response } from 'express'; 
//Service
import { play } from '../services/game';
//Types
import { playRequest } from '../../submodules/core/types/game';
import { HttpStatusCode } from '../../submodules/core/www/statusCode';


export const playHandler = async (req: Request, res: Response) => {
    const body: playRequest = {
        token: req.header('X-Game-Token') || ' ',
        score: req.body.number
    };
    const result = await play(body);

    res.status(HttpStatusCode.OK).json({type: true});
};