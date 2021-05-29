import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

import {getSchema} from './getSchema';

export const startServer = async () => {
    const app = express();

    await mongoose.connect(`mongodb://localhost:27017/
    ${process.env.TEST_SERVER === 'true' ? 'test' : 'posts'}`, {useNewUrlParser: true, useUnifiedTopology: true});
    
   

    const server = new ApolloServer({schema: getSchema() });
    
    server.applyMiddleware({app});
    
    app.listen({port: process.env.TEST_SERVER === 'true' ? 0 : 4000}, () => {
        console.log(`Server listening on http://localhost:4000${server.graphqlPath}`)
    });
};