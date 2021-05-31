import { middlewareFn } from "graphql-add-middleware";
import { verify } from "jsonwebtoken";
import {MyContext} from '../other/MyContext';

export const isAuth: middlewareFn = (_p, _a, context,_i, next) => {
    const authorization =  context.req.headers['authorization'];

    if (!authorization) {
        throw new Error("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.SECRET!);
        context.payload = payload;
    } catch(err){
        throw new Error("not authenticated");
    }
    
    return next();
}