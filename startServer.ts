import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { verify } from "jsonwebtoken";
import { ApolloServer } from 'apollo-server-express';

import { User } from './models/User';
import { getSchema } from './getSchema';
import { CreateAccessToken } from './auth/createAuth'; 
import "babel-polyfill";


export const startServer: () => Promise<void> = async () => {
    const app = express();
    app.use(cookieParser());

    await mongoose.connect(`mongodb://localhost:27017/
    ${process.env.TEST_SERVER === 'true' ? 'test' : 'posts'}`, {useNewUrlParser: true, useUnifiedTopology: true});

    const badResponse = {
        ok: false,
        accessToken: ''
    };

   app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.token;

        if (!token) {
          res.send(badResponse);
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.SECRET!);
        } catch {
            res.send(badResponse);
        }
        const used = payload.used;

        if (used){
            res.send(badResponse);
        }

        // User is valid

       const user = await User.findOne({id : payload.UserId});

       if (!user) res.send(badResponse);

       payload.used = true;

       res.cookie('jid',
        CreateAccessToken(user?.id,'7d', false), 
        {
          httpOnly: true
        });

        res.send({
            accessToken: CreateAccessToken(user?.id, '15m')
        });

   });

    const server = new ApolloServer({schema: getSchema(), context: ({req,res}) => ({req,res}) });
    
    server.applyMiddleware({app});
    
    app.listen({port: process.env.TEST_SERVER === 'true' ? 0 : 4000}, () => {
        console.log(`Server listening on http://localhost:4000${server.graphqlPath}`)
    });
};