import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, TouchableOpacity, Text }from 'react-native'
import { colors } from '../config'
import { Query } from 'react-apollo'
import listMyTagsQuery from '../queries/listMyTags'
import { AppContext } from '../App'
import { MaterialIcons } from '@expo/vector-icons'

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

          return (
            <Query query={listMyTagsQuery}>
              {({ loading, error, data: { listMyTags } }) => {

                if (loading) return <Text>Loading...</Text>;
                if (error) return <Text>Error :(</Text>;

                return ([
                  <Outer horizontal={true} key={1}>
                    {app.searchTags.map((tag, i) =>
                      <Tag activeOpacity={0.8} key={i} onPress={() => removeSearchTag(tag)} active>
                        <TagText active>{tag}
                        </TagText>
                        <MaterialIcons name="close" size={22} color="black"/>
                      </Tag>
                    )}
                  </Outer>,
                  <Outer horizontal={true} key={2}>
                    {listMyTags.items
                      .filter(item => item.slug.toLowerCase().includes(app.searchTerm.toLowerCase()))
                      .map((item, i) =>
                      <Tag activeOpacity={0.8} key={i} onPress={() => addSearchTag(item.slug)}>
                        <TagText>{item.slug}</TagText>
                      </Tag>
                    )}
                  </Outer>
                ])
              }}
            </Query>
          )
        }}
      </AppContext.Consumer>
    )
  }

}

const Outer = styled.ScrollView`
  background: #000;
`

const Tag = styled.TouchableOpacity`
  margin: 10px 5px;
  padding: 10px;
  border: 2px dotted ${colors.primary};
  border-radius: 5px;
  height: 45px;
  background: ${props => props.active ? colors.primary : 'black'};
  flex-direction: row;
  align-items: center;
`

const TagText = styled.Text`
  color: ${props => props.active ? 'black' : colors.primary};
`

export default TagSelect 
