import {gql} from '@apollo/client';

export const UPDATE_USER_PHONE_NO = gql`
  mutation UPDATE_USER_PHONE_NO($id: ID!, $phoneNo: String) {
    updateUser(id: $id, data: {phoneNo: $phoneNo}) {
      id
    }
  }
`;

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
      id
      googleId
      name
      firstName
      lastName
      email
      photo
    }
  }
`;
