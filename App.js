import React from 'react';
import { Asset, Font, AppLoading } from 'expo'
import aws_exports from './aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import ApolloClient from 'apollo-boost'
import Amplify, { Auth } from 'aws-amplify';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from './containers/WelcomeScreen'
import HomeScreen from './containers/HomeScreen'
import OtherScreen from './containers/OtherScreen'
import AuthLoadingScreen from './containers/AuthLoadingScreen'
import SignInScreen from './containers/SignInScreen'
import CreateFold from './containers/CreateFold'

Amplify.configure(aws_exports);

export const client = new AWSAppSyncClient({
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

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    CreateFold: CreateFold,
    Other: OtherScreen,
  },
  {
    headerStyle: {
      backgroundColor: '#f0f',
    },
  }
  );

const AuthStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignIn: SignInScreen
  },
  {
    headerMode: 'none',
  }
);

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

  state = {
    isReady: false,
  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <ApolloProvider client={client}>
        {/*<Rehydrated>*/}
          <RootStack/>
        {/*</Rehydrated>*/}
      </ApolloProvider>
    );
  }

  async _cacheResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        'Lato': require('./assets/fonts/Lato-Regular.ttf')
      }),
      Asset.loadAsync([
        require('./assets/images/foldLogo.png')
      ]),
    ]);
  }
}
