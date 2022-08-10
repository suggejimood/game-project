import { Request, Response } from "express";
//Services
import { signin, 
    signout, 
    signup 
   } from "../services/auth";
//Type
import { playerSigninRequest, 
         playerSignoutRequest, 
         playerSignupRequest 
        } from "../../submodules/core/types/player";

import { HttpStatusCode } from "../../submodules/core/www/statusCode";


export const signupHandler = async (req: Request, res: Response) => {
    const body: playerSignupRequest = {
        nickname: req.body.nickname,
        nameSurname: req.body.nameSurname,
        aboutMe: req.body?.aboutMe,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
        country: req.body.country,
    };
    await signup(body);

    res.status(HttpStatusCode.OK).redirect('/home');
};

export const signinHandler = async (req: Request, res: Response) => {
    const body: playerSigninRequest = {
        email: req.body.email,
        password: req.body.password,
        close: req.body.close,
    };

    const result = await signin(body);

    res.status(HttpStatusCode.OK).header('X-Game-Token', result.token).json({msg: "ok"});
};

export const signoutHandler = async (req: Request, res: Response) => {
    const body: playerSignoutRequest = {
        token: req.body.token
    }
    signout(body);

    res.status(HttpStatusCode.OK).header('X-Game-Token', '')
};