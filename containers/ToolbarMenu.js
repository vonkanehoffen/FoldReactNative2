import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../config'
import { withNavigation } from 'react-navigation'
import { Auth } from 'aws-amplify'
import { client } from '../App'

class ToolbarMenu extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Menu>
        <MenuTrigger>
          <MaterialIcons
            name="more-vert"
            size={22}
            color="black"
            style={{ padding: 10 }}
          />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={() => navigate('About')} text='About'/>
          <MenuOption onSelect={this.signOut} text='Sign Out'/>
        </MenuOptions>
      </Menu>
    )
  }

  signOut = async () => {
    await Auth.signOut()
    client.resetStore()
    this.props.navigation.navigate('Auth');
  };


}

// TODO: Move position down.
// This may need a custom renderer? See https://github.com/instea/react-native-popup-menu/blob/master/doc/examples.md
// "This allow you to define animations, position of menu and much more"

const optionsStyles = {
  optionsContainer: {
    backgroundColor: colors.primary,
    padding: 5,
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
  },
  optionWrapper: {
    // backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    // color: 'brown',
  },
};

export default withNavigation(ToolbarMenu)
