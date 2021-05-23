const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
 type Query {
    hello: String!
    student: Student!
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
        })
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(`Server running on ${url}`));