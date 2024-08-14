import gql from 'graphql-tag';

const typeDefs = gql`
  type Note {
    id: String!
    title: String!
    body: String!
    createdAt: String!
  }

  type Query {
    notes: [Note!]!
    note(id: String!): Note
  }

  type Mutation {
    createNote(title: String!, body: String!): Note!
    updateNote(id: String!, title: String, body: String): Note!
    deleteNote(id: String!): Note!
  }
`;

export default typeDefs;
