import {gql} from '@apollo/client';
export const allUsers = gql`
  query {
    allUsers {
      name
    }
  }
`;

export const GET_USER_WITH_GOOGLE_ID = gql`
  query GET_USER_WITH_GOOGLE_ID($id: String) {
    allUsers(where: {googleId: $id}) {
      id
      googleId
      name
    }
  }
`;
export const GET_USER_WITH_ID = gql`
  query GET_USER_WITH_ID($id: ID!) {
    User(where: {id: $id}) {
      id
      googleId
      name
    }
  }
`;

// photo: null
// email: "valormedia254@gmail.com"
// familyName: "Media"
// givenName: "Valor"
// name: "Valor Media"
// id: "102670389862157858936"

