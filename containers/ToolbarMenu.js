import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import config from '../config'

class ToolbarMenu extends React.Component {

  render() {
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
          <MenuOption onSelect={() => alert(`about...`)} text='About'/>
          <MenuOption onSelect={() => alert(`sign out...`)} text='Sign Out'/>
        </MenuOptions>
      </Menu>
    )
  }

}

// TODO: Move position down.
// This may need a custom renderer? See https://github.com/instea/react-native-popup-menu/blob/master/doc/examples.md
// "This allow you to define animations, position of menu and much more"

const optionsStyles = {
  optionsContainer: {
    backgroundColor: config.primaryColor,
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

export default ToolbarMenu