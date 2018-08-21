import React from 'react'
import styled from 'styled-components'
import { colors } from '../config'

const Outer = styled.TouchableOpacity`
  background: ${props => props.dark ? 'black' : colors.primary};
  padding: 15px;
  border-radius: 3px;  
`

const Inner = styled.Text`
  font-family: Lato;
  font-weight: normal;
  color: ${props => props.dark ? colors.primary : 'black'};
  text-align: center;
`

export default (props) => (
  <Outer {...props} activeOpacity={0.8}>
    <Inner {...props}>{props.title}</Inner>
  </Outer>
)
