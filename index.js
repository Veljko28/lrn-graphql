import {ApolloServer, gql} from 'apollo-server-express';
import express from 'express';

import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';


const app = express();

const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});

app.listen({port: 4000}, () => {
    console.log(`Server listening on http://localhost:4000${server.graphqlPath}`)
});