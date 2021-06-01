import { verify } from "jsonwebtoken";
import { skip } from 'graphql-resolvers';
import { MyContext } from "../other/MyContext";


export const isAuth = (_p: any, _a: any, ctx: MyContext) => {
    const authorization = ctx.req.headers['authorization'];

    if (!authorization) {
        throw new Error("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const addPayload = verify(token, process.env.SECRET!);
        (ctx.payload as any) = addPayload;
    } catch(err){
        throw new Error("not authenticated");
    }
    
    return skip;
}