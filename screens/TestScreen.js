import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InputScrollView from 'react-native-input-scroll-view'
import { TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class TestScreen extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {
    text1: 'whatever 1',
    text2: 'whatever 2',
    text3: 'whatever 3',
  }

  // See https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <View>
          <TextInput
              style={{height: 100, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text1) => this.setState({text1})}
              value={this.state.text1}
            />
          <TextInput
            style={{height: 100, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text2) => this.setState({text2})}
            value={this.state.text2}
          />
          <TextInput
            style={{height: 100, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text3) => this.setState({text3})}
            value={this.state.text3}
          />
          <Padder/>
        </View>
      </KeyboardAwareScrollView>
    )
  }

}

const Padder = styled.View`
  background: #ff0000;
  height: 100px;
`

export default TestScreen 
