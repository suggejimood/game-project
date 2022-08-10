import { Redis } from "../../config/cache/redis";
//Model
import { PlayerModel } from "../models/player";
//Error
import { BadRequestError } from "../../submodules/core/errors/bad-request";
import { NotFoundError } from "../../submodules/core/errors/not-found";
//Types
import { playerFilter, playerItems } from "../../submodules/core/types/common.types";

import { 
    listPlayerResponse, 
    playerProfileRequest, 
    profileResponse, 
    myProfileRequest, 
    listPlayerRequest, 
    searchPlayerRequest, 
    searchPlayerResponse, 
    updateProfileRequest, 
    rankListRequest 
}from "../../submodules/core/types/player";
//Function
import { jwtPlayerId } from "../../submodules/functions/token";


export async function myProfile(player: myProfileRequest): Promise<profileResponse> {
    const playerId = await jwtPlayerId(player.token);

    const existingPlayer = await PlayerModel.findById(playerId);
    if(!existingPlayer){
        throw new BadRequestError('Somthing went wrong! Player can not found.');
    }

    let profile: profileResponse = {
        nickname: existingPlayer.nickname,
        country: existingPlayer.country,
        rank: existingPlayer.rank,
    };

    if(existingPlayer.settings.showEmail){
        profile.email = existingPlayer.email;
    }
    if(existingPlayer.settings.showNameSurname){
        profile.nameSurname = existingPlayer.nameSurname;
    }
    if(existingPlayer.aboutMe){
        profile.aboutMe = existingPlayer.aboutMe;
    }

    return profile;
}

export async function playerProfile(player: playerProfileRequest): Promise<profileResponse> {
    const existingPlayer = await PlayerModel.findById(player.id);

    if(!existingPlayer){
        throw new NotFoundError();
    }

    let profile: profileResponse = {
        nickname: existingPlayer.nickname,
        country: existingPlayer.country,
        rank: existingPlayer.rank,
    };

    if(existingPlayer.settings.showEmail){
        profile.email = existingPlayer.email;
    }

    if(existingPlayer.settings.showNameSurname){
        profile.nameSurname = existingPlayer.nameSurname;
    }

    if(existingPlayer.aboutMe){
        profile.aboutMe = existingPlayer.aboutMe;
    }

    return profile;
}

export async function playerList(body: listPlayerRequest): Promise<listPlayerResponse> {
    let filter: playerFilter = {};
    if(body.filter.country){
        filter.country = body.filter.country;
    }
    if(body.filter.rank){
        filter.rank = body.filter.rank;
    }

    const list = await PlayerModel.paginate(filter, {page: body.pagination.page, limit: body.pagination.limit,});
    if(!list){
        throw new BadRequestError('Players can not found');
    }

    let tempolaryItems: playerItems = [];
    list.docs.map((val, index)=>{
        tempolaryItems[index] = {
            id: val._id.toString(),
            nickname: val.nickname,
            rank: val.rank,
            country: val.country
        }
    });

    let result: listPlayerResponse = {
        pagination: {
            page: body.pagination.page, 
            limit: body.pagination.limit,
        },
        items: tempolaryItems
    }
    if(list.nextPage){
        result.pagination.nextPage = list.nextPage;
    }

    return result;
}
export async function playerRankList(body: rankListRequest): Promise<listPlayerResponse> {
    const redis = await Redis.connect();
    let playerList = [];

    for(let i: number = 0; i < 100; i ++){
        let val = redis.get(`player_list_${i}`);
        if(!val){
            break;
        }
        playerList[i] = val;
    };

    let items = [];
    for(let i: number = (1 * body.pagination.page) - 1; i < body.pagination.limit * body.pagination.page; i ++){
        const player = await PlayerModel.findById(playerList[i]);
        if(player)
        {
            items.push({
                id: player._id.toString(),
                nickname: player.nickname,
                rank: player.rank,
                diff: player.diff.old - player.diff.now,
                country: player.country
            });
        }
    }
    
    let result: listPlayerResponse = {
        pagination: body.pagination,
        items: items
    };

    return result;
}

/*
export async function searchPlayer(body: searchPlayerRequest ): Promise<searchPlayerResponse> {
    const text = body.searchText;
}*/

export async function updateProfile(body: updateProfileRequest): Promise<void> {
    const playerId = await jwtPlayerId(body.token);

    let updateProfile: any;
    if(body.nameSurname){
        updateProfile.nameSurname = body.nameSurname;
    }
    if(body.country){
        updateProfile.country = body.country;
    }
    if(body.aboutMe){
        updateProfile.aboutMe = body.aboutMe;
    }
    if(body.settings.showEmail){
        updateProfile.settings.showEmail;
    }
    if(body.settings.showNameSurname){
        updateProfile.settings.showNameSurname;
    }
    
    const player = await PlayerModel.updateOne({_id: playerId}, updateProfile);
    if(!player){
        throw new BadRequestError("Player can not be found! Pleas try agin!");
    }
}