import React from 'react'
import styled from 'styled-components'
import { View, Button, AsyncStorage, StyleSheet, ActivityIndicator, TextInput, Text } from 'react-native'
import { Auth } from 'aws-amplify'

const Input = styled.TextInput`
  height: 40px;
  width:100%;
  background: #ffffff;
  margin:10px;
`

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
    gaInitialized: false,
    loading: false,
    error: false,
    user: false,
    username: '',
    password: '',
  }

  setLoading = () => this.setState({ loading: true, error: false })
  setResult = (r) => this.setState({ ...r, loading: false })

  doSignIn = async () => {
    this.setLoading()
    try {
      const user = await Auth.signIn(
        this.state.username,
        this.state.password
      )
      this.setResult({ user })
      this.props.navigation.navigate('Home')
    } catch (e) {
      this.setResult({ error: e.message })
    }
  }

  doSignOut = () => {
    Auth.signOut()
    this.setState({ user: false })
  }

  render() {
    const { loading, user, error, username, password } = this.state

    if(loading) return <ActivityIndicator />

    return (
      <View style={styles.container}>
        <Input
          placeholder="User name"
          textContentType="username"
          autoCapitalize="none"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}/>
        <Input
          placeholder="Password"
          textContentType="password"
          autoCapitalize="none"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry/>
        <Button title="Sign in!" onPress={this.doSignIn} />
        {error && <Text>{error}</Text>}
      </View>
    );
  }
  //
  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen
