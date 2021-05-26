import {gql} from 'apollo-server-express';


export const typeDefs = gql`
    type Query {
        hello: String!
        posts: [Post!]!
        users: [User!]!
        postById(id: String!): Post
    }

    type Mutation {
        createUser(email: String!,password: String!): User!
        createPost(title: String!, desc: String!): Post!
        deletePost(id: String!): Boolean!
        updatePost(id: String!, title: String!, desc: String!): Boolean!
    }


    type Post {
        id: ID!
        title: String!
        desc: String!
    }

    type User {
        id: ID!
        email: String!
        password: String!
    }
`;