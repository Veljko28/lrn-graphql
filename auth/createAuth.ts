import {sign} from 'jsonwebtoken';

export const CreateAccessToken = (id: string, exp: string) => {
    return sign({UserId: id}, process.env.SECRET!, {expiresIn: exp});
}