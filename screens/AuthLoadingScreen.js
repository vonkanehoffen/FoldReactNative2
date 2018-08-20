import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import { Auth } from 'aws-amplify'
import FullScreenLoading from '../components/FullScreenLoading'

class AuthLoadingScreen extends React.Component {

  async componentWillMount() {
    // const userToken = await AsyncStorage.getItem('userToken');
    const { navigate } = this.props.navigation
    try {
      const user = await Auth.currentCredentials()
      navigate('App')
    } catch (e) {
      navigate('Auth')
    }
  }

  render() {
    return (
      <FullScreenLoading/>
    );
  }
}

export default AuthLoadingScreen