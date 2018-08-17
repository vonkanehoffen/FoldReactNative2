import React from 'react'
import styled from 'styled-components'
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { Auth } from 'aws-amplify'
import TextFieldDark from '../components/TextFieldDark'
import BigButton from '../components/BigButton'
import Error from '../components/Error'
import ScreenHeading from '../components/ScreenHeading'

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
      <Outer behavior="padding" enabled>
        <StyledSignInScreen>
          <ScreenHeading>SIGN IN</ScreenHeading>
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
      </Outer>
    );
  }
}

const Outer = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: blueviolet;
`

const StyledSignInScreen = styled.View`
  width: 90%;
`

export default SignInScreen
