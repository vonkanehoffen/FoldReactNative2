import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CentreContainer from '../components/CentreContainer'
import { Image } from 'react-native'
import BigButton from '../components/BigButton'
import config from '../config'

class WelcomeScreen extends React.Component {

  static navigationOptions =   {
  }

  render() {
    const { navigation: { navigate }} = this.props

    return (
      <CentreContainer>
        <Image source={require('../assets/images/foldLogo.png')}/>
        <ActionBar>
          <Action onPress={() => navigate('SignUp')}>
            <Label>SIGN UP</Label>
          </Action>
          <Action onPress={() => navigate('SignIn')}>
            <Label>SIGN IN</Label>
          </Action>
        </ActionBar>
      </CentreContainer>
    )

  }
}

const ActionBar = styled.View`
  background: ${config.primaryColor};
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
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