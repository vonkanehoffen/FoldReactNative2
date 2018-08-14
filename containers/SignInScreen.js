import React from 'react'
import styled from 'styled-components'
import { View, Button, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { Auth } from 'aws-amplify'
import { TextField } from 'react-native-material-textfield'
import TextFieldDark from '../components/TextFieldDark'
import CentreContainer from '../components/CentreContainer'
import config from '../config'
import BigButton from '../components/BigButton'
import Error from '../components/Error'

const StyledSignInScreen = styled.View`
  width: 90%;
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

  render() {
    const { loading, user, error, username, password } = this.state

    if(loading) return <ActivityIndicator />

    return (
      <CentreContainer>
        <StyledSignInScreen>
          <TextFieldDark
            label="User name"
            textContentType="username"
            autoCapitalize="none"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}/>
          <TextFieldDark
            label="Password"
            textContentType="password"
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry/>
          <BigButton title="Sign in" onPress={this.doSignIn} />
          {error && <Error>{error}</Error>}
        </StyledSignInScreen>
      </CentreContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen
