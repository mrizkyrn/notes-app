import { gql } from '@apollo/client';

export const GET_NOTES_QUERY = gql`
  query notes {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;
