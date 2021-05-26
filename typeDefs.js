import {gql} from 'apollo-server-express';


export const typeDefs = gql`
    type Query {
        hello: String!
        posts: [Post!]!
        postById(id: String!): Post
    }

    type Mutation {
        createPost(title: String!, desc: String!): Post!
        deletePost(id: String!): Boolean!
        updatePost(id: String!, title: String!, desc: String!): Boolean!
    }


    type Post {
        id: ID!
        title: String!
        desc: String!
    }
`;