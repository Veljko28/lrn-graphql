import { GraphQLSchema } from 'graphql';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import {importSchema} from 'graphql-import';

import * as fs from 'fs';
import * as path from 'path';

export const getSchema: () => GraphQLSchema = () => {

    const schemas: GraphQLSchema[] = [];

    const folders = fs.readdirSync(path.join(__dirname, './modules'));

    folders.forEach(folder => {
        const {resolvers} = require(path.join(__dirname, `./modules/${folder}/resolvers`));
        const typeDefs = importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));

        schemas.push(makeExecutableSchema({resolvers, typeDefs}));
    })

    return mergeSchemas({schemas});
}