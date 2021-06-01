import { Response, Request } from "express";

export interface MyContext {
    req: Request;
    res: Response;
    payload?: {
        UserId: string,
        used: Boolean
    }
}