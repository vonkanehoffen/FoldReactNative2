import AWSAppSyncClient from 'aws-appsync'
import ApolloClient from 'apollo-boost'
import { Auth } from 'aws-amplify';
import aws_exports from './aws-exports'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'


// export const client = new ApolloClient({
//   uri: aws_exports.aws_appsync_graphqlEndpoint,
//   request: async (operation) => {
//     operation.setContext({
//       headers: {
//         'X-Api-Key': 'da2-3hxvdaiazvdtzfrnfnqgwuupsa',
//       }
//     })
//   }
// })

const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => {
      return Auth.currentCredentials()
    }
  },
  disableOffline: true,
})

export default client