const {ApolloServer, gql} = require('apollo-server');

const users = [
    {
    name: "test",
    password: "test"
    },
    {
        name: "test",
        password: "test"
    }
];


const typeDefs = gql`
 type Query {
    hello: String!
    student: Student!
    getAllUsers: [UserInfo!]
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


 input UserInfo {
    name: String!
    password: String!
 }

 type Mutation {
     login(info: UserInfo!): Boolean!
     register(info: UserInfo!): UserInfo!
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
            users.push(args.info);
            return args.info;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(`Server running on ${url}`));