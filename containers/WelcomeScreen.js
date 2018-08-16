import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View } from 'react-native'
import CentreContainer from '../components/CentreContainer'
import { Image } from 'react-native'
import BigButton from '../components/BigButton'
import { colors } from '../config'

class WelcomeScreen extends React.Component {

  static navigationOptions =   {
  }

  render() {
    const { navigation: { navigate }} = this.props

    return (
      <Outer>
        <Splash>
          <Image source={require('../assets/images/foldLogo.png')}/>
        </Splash>
        <ActionBar>
          <Action onPress={() => navigate('SignUp')}>
            <Label>SIGN UP</Label>
          </Action>
          <Action onPress={() => navigate('SignIn')}>
            <Label>SIGN IN</Label>
          </Action>
        </ActionBar>
      </Outer>
    )

  }
}

const Outer = styled.View`
  flex: 1;
  background:#000;
`

const Splash = styled.View`
  background: #000;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const ActionBar = styled.View`
  background: ${colors.primary};
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Action = styled.TouchableOpacity`
  padding: 20px;
  flex: 1;
  border: 1px solid #000;
`

const Label = styled.Text`
  color: black;
  text-align: center;
  font-family: Lato;
  font-size: 18px;
`


export default WelcomeScreen