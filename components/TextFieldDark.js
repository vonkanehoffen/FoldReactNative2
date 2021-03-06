import React from 'react'
import { TextField } from 'react-native-material-textfield'
import { colors } from '../config'

const TextFieldDark = (props) => (
  <TextField
    textColor={colors.primary}
    baseColor={colors.primary}
    tintColor={colors.primary}
    {...props}
  />
)

export default TextFieldDark