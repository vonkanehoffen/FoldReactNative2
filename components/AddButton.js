import React from 'react'
import styled from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

const StyledAddButton = styled.TouchableOpacity`
  background:#f00;
  width: 56px;
  height: 56px;
`

const AddButton = (props) => (
  <StyledAddButton {...props}>
    <MaterialIcons name="add" size={32} color="blue"/>
  </StyledAddButton>
)

export default AddButton
