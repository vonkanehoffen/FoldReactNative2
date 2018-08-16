import React from 'react'
import styled from 'styled-components'
import { colors } from '../config'

const Outer = styled.TouchableOpacity`
  background: ${colors.primary};
  padding: 15px;
  border-radius: 3px;  
`

const Inner = styled.Text`
  font-family: Lato;
  font-weight: normal;
  color: #000;
  text-align: center;
`

export default ({ title, onPress }) => (
  <Outer onPress={onPress} activeOpacity={0.8}>
    <Inner>{title}</Inner>
  </Outer>
)
