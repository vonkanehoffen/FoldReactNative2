// import ApolloClient from 'apollo-boost'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import Url from 'url'
import Signer from 'aws-appsync/lib/link/signer/signer'
import { Auth } from 'aws-amplify';
import aws_exports from './aws-exports'
import AWSAppSyncClient from 'aws-appsync'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'

// See https://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-react.html

const fetcher = async (uri, options) => {
  console.log('fetch....', uri, options)
  const { accessKeyId, secretAccessKey, sessionToken } = await Auth.currentCredentials()
  console.log('CREDENTIALS:', { accessKeyId, secretAccessKey, sessionToken })
  const { host, path } = Url.parse(aws_exports.aws_appsync_graphqlEndpoint);
  const formatted = {
    ...options,
    service: 'appsync',
    region: aws_exports.aws_appsync_region,
    url: aws_exports.aws_appsync_graphqlEndpoint,
    host,
    path,
  }

  const signedRequest = Signer.sign(formatted, {
    access_key: accessKeyId, secret_key: secretAccessKey, session_token: sessionToken
  })

  return fetch(aws_exports.aws_appsync_graphqlEndpoint, signedRequest);
}

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.map(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//           ),
//         );
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     new HttpLink({
//       uri: aws_exports.aws_appsync_graphqlEndpoint,
//       fetch: fetcher,
//     })
//   ]),
//   cache: new InMemoryCache()
// });

const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => {
      return Auth.currentCredentials()
    }
  },
  disableOffline: false,
  options: {
    fetchPolicy: 'cache-and-network'
  },
})


export default client