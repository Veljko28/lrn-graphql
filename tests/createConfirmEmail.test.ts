import {createConfirmEmail} from '../confirmEmail/createConfirmEmail';
import {startServer} from '../startServer';
import {User} from '../models/User';
import axios from 'axios';
import * as Redis from 'ioredis';
import 'regenerator-runtime/runtime';

let userId = "";

beforeAll(async () => {
    await startServer();
    const user = new User({email: "test1@gmail.com", password: "testingEmail11"});
    await user.save();

    userId = user.id;
})

describe("CreateCofirmEmail Tests", () => {

    test("Make sure createConfirmEmail works", async () => 
    {
        const redis = new Redis(); 
        const url = await createConfirmEmail(process.env.HOST as string, userId as string, redis);
    
        const response = await axios.get(url);
        console.log(response);
    
        expect(response).toEqual("ok");
            
        const user = await User.findOne({id: userId});
    
        expect((user as any).confirmed).toBeTruthy();
    
        const chunks = url.split('/');
        const id = chunks[chunks.length-1];
        const value = await redis.get(id);
    
        expect(value).toBeNull();
    
    });
    test("Make sure it sends invalid if id is invalid", async () => {
    
        const response = await axios.get(`${process.env.HOST}/confirm/rwye98tr73289`);
    
        expect(response).toEqual("invalid");
    })
})