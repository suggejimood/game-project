import { Request, Response } from "express";
//Services
import { 
    myProfile, 
    playerList, 
    playerProfile 
} from "../services/player";
//Types
import { 
    listPlayerRequest, 
    listPlayerResponse, 
    myProfileRequest, 
    playerProfileRequest, 
    profileResponse, 
    updateProfileRequest 
} from "../../submodules/core/types/player";
import { HttpStatusCode } from "../../submodules/core/www/statusCode";



export const seeMyProfileHandler = async (req: Request, res: Response) => {
    const body: myProfileRequest = {
        token: req.header('X-Game-Token') || ' ',
    };
    const result: profileResponse = await myProfile(body);

    res.status(HttpStatusCode.OK).json(result);
};

export const seePlayerProfileHandler = async (req: Request, res: Response) => {
    const body: playerProfileRequest = {
        id: req.body.id
    };
    const result: profileResponse = await playerProfile(body);

    res.status(HttpStatusCode.OK).json(result);
};

export const playerListHandler = async (req: Request, res: Response) => {
    const body: listPlayerRequest = {
        pagination: req.body.pagination,
        filter: {
            country: req.body?.country,
            rank: req.body?.rank
        }
    };
    const result: listPlayerResponse = await playerList(body);

    res.status(HttpStatusCode.OK).json(result);
};

export const playerRankListHandler = async (req: Request, res: Response) => {

};

export const searchPlayerHandler = async (req: Request, res: Response) => {

};

export const updateProfileHandler = async (req: Request, res: Response) => {
    const body: updateProfileRequest = {
        country: req.body?.country,
        aboutMe: req.body?.aboutMe,
        nameSurname: req.body?.nameSurname,
        token: req.header('X-Game-Token') || ' ',
        settings: {
            showEmail: req.body?.showEmail,
            showNameSurname: req.body?.showNameSurname
        }
    };

    res.status(HttpStatusCode.OK).json({msg: "ok"});
};