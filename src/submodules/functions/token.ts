import jwt from 'jsonwebtoken';
import { JWTisnotValid } from '../core/errors/jwt-is-not-valid';
import { tokenType } from '../core/types/common.types';

export async function jwtPlayerId(token: string): Promise<string> {
    const decode = await <tokenType>jwt.verify(token, `${process.env.JWT_SECRET}`);

    if(!decode){
        throw new JWTisnotValid();
    }

    const { id } = decode;

    return id;
}

export async function jwtPlayerNickname(token: string) {
    const decode = await <tokenType>jwt.verify(token, `${process.env.JWT_SECRET}`);

    if(!decode){
        throw new JWTisnotValid();
    }

    const { nickname } = decode;

    return nickname;
}