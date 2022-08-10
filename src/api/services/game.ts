import { Redis } from "../../config/cache/redis";
//Model
import { PlayerModel } from "../models/player";
//Error
import { BadRequestError } from "../../submodules/core/errors/bad-request";
import { JWTisnotValid } from "../../submodules/core/errors/jwt-is-not-valid";
//Type
import { playRequest } from "../../submodules/core/types/game";
//Function
import { jwtPlayerId } from "../../submodules/functions/token";



export async function play(body: playRequest): Promise<void> {
    const playerId = await jwtPlayerId(body.token);

    if(!playerId){
        throw new JWTisnotValid();
    }
    const player = await PlayerModel.findById(playerId);

    if(!player){
        throw new BadRequestError('Something went wrong!');
    }

    let totalMoney: number = (body.score * 2);
    let poolMoney: number = totalMoney * 0.02;
    let earnMoney: number = totalMoney - poolMoney;
    earnMoney = player.money + earnMoney;

    let newRank: number = ( body.score * 0.2) + player.rank;

    await PlayerModel.updateOne({_id: playerId}, {money: earnMoney, rank: newRank});

    const redis = await Redis.connect();
    let money = redis.get('pool');
    if(money){
        poolMoney = Number(money) + poolMoney;
        redis.set('pool', poolMoney);
    }
    else{
        redis.set('pool', poolMoney);
    }
    redis.quit();
}
