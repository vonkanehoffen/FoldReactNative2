import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { AppContext } from '../App'

class HeaderSearch extends Component {

  static defaultProps = {}
  static propTypes = {}

  render() {
    return (
      <AppContext.Consumer>
        {app =>
          <Outer>
            <MaterialIcons
              name="search"
              size={22}
              color="black"
              style={{ padding: 10 }}
              onPress={() => this.termInput.focus()}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 18
              }}
              placeholder="Search"
              placeholderTextColor="black"
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={app.setSearchTerm}
              value={app.searchTerm}
              ref={input => this.termInput = input}
            />
          </Outer>
        }
      </AppContext.Consumer>
    )
  }

}

const Outer = styled.View`
  flex-direction: row;
`

const termInputStyle = {
  flex: 1,
  fontSize: '16px',
}

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
`


export default HeaderSearch 
