import {gql} from 'apollo-server-express';


export const typeDefs = gql`
    type Query {
        hello: String!
        posts: [Post!]!
        users: [User!]!
        userById(id: String): User
        postById(id: String!): Post
    }

    input UserInfo {
        email: String!
        password: String!
    }

    type Mutation {
        createUser(info: UserInfo): User!
        deleteUser(id: String!): Boolean!
        updateUser(id:String, info: UserInfo!): Boolean!

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