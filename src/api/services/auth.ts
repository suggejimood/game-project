import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//Model
import { PlayerModel } from "../models/player";
//Types
import { 
    playerSigninRequest, 
    playerSigninResponse, 
    playerSignoutRequest, 
    playerSignupRequest,
} from "../../submodules/core/types/player";
//Errors
import { BadRequestError } from "../../submodules/core/errors/bad-request";
import { Redis } from '../../config/cache/redis';
import { tokenType } from '../../submodules/core/types/common.types';
import { jwtPlayerId } from '../../submodules/functions/token';
import { AlreadyExistError } from '../../submodules/core/errors/already-exist';

export async function signup(player: playerSignupRequest): Promise<void> {
    const newPlayer = new PlayerModel({
        nickname: player.nickname,
        nameSurname: player.nameSurname,
        aboutMe: player.aboutMe,
        email: player.email,
        password: player.password,
        country: player.country,
    });
    await newPlayer.save();
}

export async function signin(body: playerSigninRequest): Promise<playerSigninResponse> {
    const player = await PlayerModel.findOne({email: body.email});

    if(!player){
        throw new BadRequestError('Email or Password is invalid');
    }

    if(!body.close || await signinControl(player.nickname)){
        throw new AlreadyExistError('This player already be signin!');
    }

    const redis = await Redis.connect();
    if(body.close){
        redis.del(`player_${player.nickname}`);
    }

    console.log(body.password, player.password)
    const passwordCheck = await bcrypt.compare(body.password, player.password);
    if(!passwordCheck){
        throw new BadRequestError('Email or Password is invalid');
    }

    const payload: tokenType = {
        id: player._id.toString(),
        nickname: player.nickname
    }
    const token = jwt.sign(payload, `${process.env.TOKEN_KEY}`);

    await redis.set(`player_${player.nickname}`, token);
    await redis.quit();

    return {token};
}

export async function signout(player: playerSignoutRequest): Promise<void> {
    const id = await jwtPlayerId(player.token);
    const _player = await PlayerModel.findById(id);
    if(!_player){
        throw new BadRequestError('This player can not found.')
    }
    const redis = await Redis.connect();
    let token = await redis.get(`player_${_player.nickname}`);
    if(token){
        redis.del(`player_${_player.nickname}`);
    }
    await redis.quit();
}

async function signinControl(nickname: string): Promise<Boolean> {
    const redis = await Redis.connect();
    const playerCache = await redis.get(`player_${nickname}`);
    if(playerCache){
        await redis.quit();
        return true;
    }
    else{
        await redis.quit();
        return false;
    }
}