import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../config'

const CardTag = ({ children }) => {
  return (
    <Outer>
      <Inner>{children}</Inner>
    </Outer>
  )
}

const Outer = styled.View`
  background: white;
  padding: 4px 6px;
  margin: 5px;
  border-radius: 2px;
`

const Inner = styled.Text`
  font-size: 12px;
  color: ${colors.cardBg2};
`

CardTag.propTypes = {}

export default CardTag