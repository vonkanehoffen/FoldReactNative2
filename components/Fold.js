import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, Text } from 'react-native'
// import DeleteFold from '../containers/DeleteFold'

// const Tag = styled.View`
//   display: inline-block;
//   margin: .5rem;
//   padding: .5rem;
//   background: darkcyan;
//   color: white;
//   font-weight: bold;
//   font-size: .8rem;
// `
const Fold = ({ fold }) => {
  return (
    <View style={fold.id < 0 ? {backgroundColor: 'palegreen'} :{}}>
      <Text>{fold.title}</Text>
      <Text>{fold.content}</Text>
      {/*{fold.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}*/}
      {/*<DeleteFold id={fold.id}/>*/}
    </View>
  )
}

Fold.propTypes = {
  fold: PropTypes.object.isRequired,
}

export default Fold