import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

import * as fs from 'fs';
import * as path from 'path';

import { GraphQLSchema } from 'graphql';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import {importSchema} from 'graphql-import';

export const startServer = async () => {
    const app = express();

    await mongoose.connect("mongodb://localhost:27017/posts", {useNewUrlParser: true, useUnifiedTopology: true});
    
    const schemas: GraphQLSchema[] = [];

    const folders = fs.readdirSync(path.join(__dirname, './modules'));

    folders.forEach(folder => {
        const {resolvers} = require(path.join(__dirname, `./modules/${folder}/resolvers`));
        const typeDefs = importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));

        schemas.push(makeExecutableSchema({resolvers, typeDefs}));
    })

    const server = new ApolloServer({schema: mergeSchemas({schemas})});
    
    server.applyMiddleware({app});
    
    app.listen({port: 4000}, () => {
        console.log(`Server listening on http://localhost:4000${server.graphqlPath}`)
    });
};