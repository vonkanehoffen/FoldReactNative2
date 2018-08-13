import React from 'react';
import aws_exports from './aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import Amplify, { Auth } from 'aws-amplify';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './containers/HomeScreen'
import OtherScreen from './containers/OtherScreen'
import AuthLoadingScreen from './containers/AuthLoadingScreen'
import SignInScreen from './containers/SignInScreen'

Amplify.configure(aws_exports);

export const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  // auth: {
  //   type: AUTH_TYPE.API_KEY,
  //   apiKey: 'da2-3hxvdaiazvdtzfrnfnqgwuupsa',
  // },
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => {
      return Auth.currentCredentials()
    }
  }
})

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);



export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/*<Rehydrated>*/}
          <RootStack/>
        {/*</Rehydrated>*/}
      </ApolloProvider>
    );
  }
}
