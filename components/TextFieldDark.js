import React from 'react'
import { TextField } from 'react-native-material-textfield'
import config from '../config'

export default (props) => (
  <TextField
    textColor={config.primaryColor}
    baseColor={config.primaryColor}
    tintColor={config.primaryColor}
    {...props}
  />
)
