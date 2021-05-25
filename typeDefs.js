import {gql} from 'apollo-server-express';


export const typeDefs = gql`
    type Query {
        hello: String!
        posts: [Post!]!
        post(_id: String!): Post
    }

    type Mutation {
        createPost(title: String!, desc: String!): Post!
        deletePost(id: String!): Boolean!
    }


    type Post {
        id: ID!
        title: String!
        desc: String!
    }
`;