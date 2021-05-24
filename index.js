const {ApolloServer, gql} = require('apollo-server');

const users = [
    {
        id: "1",
        name: "test",
        password: "test"
    },
   

    {
        id: "2",
        name: "test2",
        password: "test2"
    },
   
];


const typeDefs = gql`
 type Query {
    hello: String!
    student: Student!
    getAllUsers: [User!]!
 }

 type Student { 
     id: ID!
     name: String!
     schoolClass: SchoolClass
 }

 type SchoolClass {
     id: ID!
     subject: String!
     students: [Student!]
 }

type User {
    id: ID!
    name: String!
    password: String!
}


 input UserInfo {
    name: String!
    password: String!
 }

 type Mutation {
     login(info: UserInfo!): Boolean!
     register(info: UserInfo!): User!
 }

`;

const resolvers = {
    Query: {
        hello: () => "Hello World",
        student: () => ({
            id: () => "1",
            name: () => "Veljko",
            schoolClass: () => ({
                id: () => "1",
                subject: () => "Programming",
                students: []
            })
        }),
        getAllUsers: () => users
    },

    Mutation: {
        login: (parent,args) => {
            const user = users.filter(x => x.name === args.info.name)[0];
            if (user === null)
                return false;
            return user.password === args.info.password;    
        },
        register: (parent,args) => {
            const user = {
                id: users.length + 1, 
                name: args.info.name,
                password: args.info.password
            }
            users.push(user);
            return user;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(`Server running on ${url}`));