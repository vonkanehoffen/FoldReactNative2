import React from 'react'
import { TextField } from 'react-native-material-textfield'
import { colors } from '../config'

const TextFieldLight = (props) => (
  <TextField
    textColor="black"
    baseColor="black"
    tintColor="black"
    {...props}
  />
)

export default TextFieldLight