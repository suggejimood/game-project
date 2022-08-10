import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
//Model
import { PlayerModel } from "../../models/player";
//Error
import { UnauthorizedError } from "../../../submodules/core/errors/unauthorized";
import { Redis } from "../../../config/cache/redis";

export const authenticationJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('X-Game-Token');
    if(!token){
        throw new UnauthorizedError();
    }

    const decoded = <{id: string, nickname: string}>jwt.verify(token, `${process.env.TOKEN_KEY}`);
    if(!decoded){
        throw new UnauthorizedError();
    }
    const { id, nickname } = decoded;
    const redis = await Redis.connect();
    const cacheToken = await redis.get(nickname);
    const player = await PlayerModel.findById(id);
    await redis.quit();
    
    if(!player || cacheToken != token){
        throw new UnauthorizedError();
    }

    next();
};