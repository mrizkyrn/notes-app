import { gql } from '@apollo/client';

export const GET_NOTES_QUERY = gql`
  query GetNotes {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;

export const GET_NOTE_QUERY = gql`
  query GetNote($id: String!) {
    note(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;
