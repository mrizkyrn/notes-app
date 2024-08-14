import { gql } from '@apollo/client';

export const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($title: String!, $body: String!) {
    createNote(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($id: String!, $title: String!, $body: String!) {
    updateNote(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;
