import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Auth } from 'aws-amplify'

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

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen