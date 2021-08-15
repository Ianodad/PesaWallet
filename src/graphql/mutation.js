export const SIGNUP_WITH_GOOGLE = gql`
  mutation UPDATE_USER_DETAILS = (
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