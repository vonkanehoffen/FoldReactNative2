import React from 'react'
import styled from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../config'

const AddButton = (props) => (
  <StyledAddButton {...props}>
    <MaterialIcons name="add" size={32} color="black"/>
  </StyledAddButton>
)

const StyledAddButton = styled.TouchableOpacity`
  background:${colors.primary};
  width: 56px;
  height: 56px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
`


export default AddButton
