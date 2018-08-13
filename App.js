import React from 'react';
import { Text, View } from 'react-native';
import aws_exports from './aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react'
import ApolloClient from 'apollo-boost'

export const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: 'da2-3hxvdaiazvdtzfrnfnqgwuupsa',
  },
})

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


const listAll = gql`
  query listAll {
    listFolds{
      items {
        title
      }
    }
  }
`

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Query query={listAll}>
            {({ data, loading, error, refetch}) => {
              return (
                <View>
                  <Text>Responseeeeeee: {JSON.stringify({data, error}, null, 2)}</Text>
                </View>
              )
            }}
          </Query>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}
