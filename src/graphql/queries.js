import {gql} from '@apollo/client';
export const allUsers = gql`
  query {
    allUsers {
      name
    }
  }
`;

export const CHECK_USER_GOOGLE_ID = gql`
  query CHECK_USER_GOOGLE_ID($id: String) {
    allUsers(where: {googleId: $id}) {
      googleId
      id
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

export const SIGNUP_WITH_GOOGLE = gql`
  mutation SIGNUP_WITH_GOOGLE(
    $photo: String
    $email: String!
    $familyName: String!
    $givenName: String!
    $name: String!
    $id: String!
  ) {
    createUser(
      data: {
        googleId: $id
        name: $name
        firstName: $givenName
        lastName: $familyName
        email: $email
        photo: $photo
      }
    ) {
      googleId
      name
      firstName
      lastName
      email
      photo
    }
  }
`;
