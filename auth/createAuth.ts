import {sign} from 'jsonwebtoken';

export const CreateAccessToken = (id: string, exp: string, used?: boolean) => {
    return used ? sign({UserId: id, used}, process.env.SECRET!, {expiresIn: exp}) : 
    sign({UserId: id}, process.env.SECRET!, {expiresIn: exp});
}