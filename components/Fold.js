import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, Text } from 'react-native'
import { colors } from '../config'
import CardTag from './CardTag'
// import DeleteFold from '../containers/DeleteFold'
import { colorFromString } from '../helpers/color'

const Fold = ({ fold }) => {
  return (
    <Outer loading={fold.id < 0} color={colorFromString(fold.tags[0])}>
      <Title>{fold.title}</Title>
      <Content>{fold.content}</Content>
      <Tags>
        {fold.tags.map(tag => <CardTag key={tag}>{tag}</CardTag>)}
      </Tags>
      {/*<DeleteFold id={fold.id}/>*/}
    </Outer>
  )
}

const Outer = styled.View`
  background: ${props => props.loading ? 'palegreen' : props.color};
  margin-top: 10px;
`

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin: 5px 10px;
`

const Content = styled.Text`
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
`

const Tags = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 5px; 
`

Fold.propTypes = {
  fold: PropTypes.object.isRequired,
}

export default Fold