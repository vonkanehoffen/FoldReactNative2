import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import listMyFoldsQuery from '../queries/listMyFolds'
import { ActivityIndicator, Button, ScrollView } from 'react-native'
import Error from '../components/Error'
import Fold from '../components/Fold'

class MyFolds extends Component {

  static defaultProps = {}
  static propTypes = {
    filter: PropTypes.array,
  }
  state = {}

  render() {
    const { filter } = this.props

    return (
      <Query query={listMyFoldsQuery}>
        {({ data, loading, error, refetch}) => {
          if(loading) return <ActivityIndicator/>
          if(error) {
            return (
              <View>
                <Button onPress={() => {
                  console.log("refetching...")
                  refetch()
                }} title="Refetch!"/>
                <Error>{JSON.stringify(error, null, 2)}</Error>
              </View>
            )
          }

          return (
            <Outer>
              {/*<Button onPress={() => refetch()} title="Refetch!"/>*/}
              {data.listMyFolds.items
                .filter(fold => {
                  if(filter.length < 1) return true
                  for(let term of filter) {
                    if(fold.tags.includes(term)) return true
                  }
                })
                .map((fold, i) => <Fold fold={fold} key={i}/>)}
            </Outer>
          )
        }}
      </Query>
    )
  }
}

const Outer = styled.ScrollView`
  background: black;
  height: 100%;
`

export default MyFolds
