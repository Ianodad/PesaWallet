import {gql} from '@apollo/client';

export const allUsers = gql`
  query {
    allUsers {
      name
    }
  }
`;
