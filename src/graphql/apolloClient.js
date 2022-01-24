import {ApolloClient, ApolloLink, InMemoryCache} from '@apollo/client';
import {onError} from 'apollo-link-error';
import {createUploadLink} from 'apollo-upload-client';
import settings from '../config/settings';
// const uri = 'http://10.0.2.2:5000/api/graphql';
const uri = settings.API_URL;
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(
          `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
        );
      }
    }),
    // this uses apollo-link-http under the hood, so all the options here come from that package
    createUploadLink({
      uri: process.env.NODE_ENV === 'development' ? uri : '',
      fetchOptions: {
        credentials: 'include',
      },
      // pass the headers along from this request. This enables SSR with logged in state
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
