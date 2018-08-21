import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, TouchableOpacity, Text }from 'react-native'
import { colors } from '../config'
import { Query } from 'react-apollo'
import listMyTagsQuery from '../queries/listMyTags'
import { AppContext } from '../App'
import TagView from '../components/TagView'

class TagSelect extends Component {

  // TODO: Context may be too many redraws. Happens every time any context is changed. Redux or props?
  // or  even https://www.apollographql.com/docs/react/essentials/local-state.html
  // ...that looks complex.
  // ... actually maybe redraws aren't too badly optimised.

  // state = {
  //   selected: [],
  // }

  // addSelect = (tag) => this.setState({
  //   selected: [ ...this.state.selected, tag]
  // })
  //
  // removeSelect = (tag) => this.setState({
  //   selected: [ ...this.state.selected.filter(s => s!== tag) ]
  // })

  render() {
    return (
      <AppContext.Consumer>
        {app => {

          const addSearchTag = (tag) => {
            app.setSearchTags([
              ...app.searchTags,
              tag
            ])
            app.setSearchTerm('')
          }

          const removeSearchTag = (tag) => {
            app.setSearchTags([
              ...app.searchTags.filter(s => s!== tag)
            ])
          }

          // TODO: Either get box-shadow working or add https://github.com/react-native-community/react-native-linear-gradient
          // This doesn't work:
          // <View key={3} style={{backgroundColor: '#f00', height: 20, shadowColor: '#0f0', shadowOffset: { width:10, height: 10 }, shadowOpacity: 0.8, shadowRadius: 10}}/>

          return (
            <Query query={listMyTagsQuery}>
              {({ loading, error, data: { listMyTags } }) => {

                if (loading) return <Text>Loading...</Text>;
                if (error) return <Text>Error :(</Text>;

                return (
                  <TagView
                    selectedTags={app.searchTags}
                    availableTags={listMyTags.items}
                    filterString={app.searchTerm}
                    addTag={addSearchTag}
                    removeTag={removeSearchTag}
                  />
                )
              }}
            </Query>
          )
        }}
      </AppContext.Consumer>
    )
  }

}


export default TagSelect 
