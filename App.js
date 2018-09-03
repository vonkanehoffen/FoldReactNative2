import React from 'react';
import { Asset, Font, AppLoading } from 'expo'
import aws_exports from './aws-exports';
import client from './ApolloAppSyncClient'
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { StatusBar } from 'react-native'
import WelcomeScreen from './screens/WelcomeScreen'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'
import CreateFoldScreen from './screens/CreateFoldScreen'
import { colors } from './config'
import { View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import ToolbarMenu from './containers/ToolbarMenu'
import TestScreen from './screens/TestScreen'


Amplify.configure({
  identityPoolId: 'us-east-1:bb103896-c351-4045-81ad-853de0071839',
  // REQUIRED - Amazon Cognito Region
  region: 'us-east-1',
  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: 'us-east-1_GhO9ocbq2',
  // OPTIONAL - Amazon Cognito Web Client ID
  userPoolWebClientId: '2bonp9g49d5v7t976i0qkaaq4l',
});

// Auth.signOut()


const AppStack = createStackNavigator(
  {
    Home: HomeScreen, // TODO: Just pass props to this for search? Context = bad?
    CreateFold: CreateFoldScreen,
    About: AboutScreen,
    Test: TestScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
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
  searchTerm: '',
  searchTags: [],
  setSearchTerm: () => {},
  setSearchTags: () => {},
})


export default class App extends React.Component {

  setSearchTerm = (searchTerm) => this.setState({ searchTerm })
  setSearchTags = (searchTags) => this.setState({ searchTags })

  state = {
    isReady: false,
    searchTerm: '',
    searchTags: [],
    setSearchTerm: this.setSearchTerm,
    setSearchTags: this.setSearchTags,
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
        <AppContext.Provider value={this.state}>
          <ApolloProvider client={client}>
            {/*<Rehydrated>*/}
              <StatusBar // TODO: Status bar config doesn't work here or in app.json.
                backgroundColor="blue"
                barStyle="dark-content"
              />
              <RootStack/>
            {/*</Rehydrated>*/}
          </ApolloProvider>
        </AppContext.Provider>
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
