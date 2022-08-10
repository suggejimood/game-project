import { Response } from 'express';
//Service
import { listTop100Player } from '../services/top100';
//Type
import { HttpStatusCode } from '../../submodules/core/www/statusCode';

export const listTop100PlayerHandler = async (res: Response) => {
    const result = await listTop100Player();

    res.status(HttpStatusCode.OK).json(result);
}