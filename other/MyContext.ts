import { Response, Request } from "express";
import { Redis }from 'ioredis';

export interface MyContext {
    req: Request;
    res: Response;
    redis: Redis,
    payload?: {
        UserId: string,
        used: Boolean
    }
}