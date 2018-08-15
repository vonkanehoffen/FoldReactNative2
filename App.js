import React from 'react';
import { Asset, Font, AppLoading } from 'expo'
import aws_exports from './aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import ApolloClient from 'apollo-boost'
import Amplify, { Auth } from 'aws-amplify';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { StatusBar } from 'react-native'
import WelcomeScreen from './containers/WelcomeScreen'
import HomeScreen from './containers/HomeScreen'
import AboutScreen from './containers/AboutScreen'
import AuthLoadingScreen from './containers/AuthLoadingScreen'
import SignInScreen from './containers/SignInScreen'
import CreateFold from './containers/CreateFold'
import config from './config'
import { View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import ToolbarMenu from './containers/ToolbarMenu'

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
    About: AboutScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: config.primaryColor,
      },
      headerRight: (
        <ToolbarMenu/>
      )
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
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

// TODO: Not currently needed.... menu context as part of react-native-popup-menu
export const AppContext = React.createContext({
  // According to https://reactjs.org/docs/context.html this initial state should indeed be duplicated here.
  toolbarMenuOpen: false, // Drop-down toolbar menu
  toggleToolbarMenu: () => {},
})


export default class App extends React.Component {

  toggleToolbarMenu = () => this.setState({ toolbarMenuOpen: !this.state.toolbarMenuOpen })

  state = {
    isReady: false,
    toolbarMenuOpen: false,
    toggleToolbarMenu: this.toggleToolbarMenu
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
      <MenuProvider>
        {/*<AppContext.Provider value={this.state}>*/}
          <ApolloProvider client={client}>
            {/*<Rehydrated>*/}
              <StatusBar // TODO: Status bar config doesn't work here or in app.json.
                backgroundColor="blue"
                barStyle="dark-content"
              />
              <RootStack/>
            {/*</Rehydrated>*/}
          </ApolloProvider>
        {/*</AppContext.Provider>*/}
      </MenuProvider>
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
