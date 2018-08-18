import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, TouchableOpacity, Text }from 'react-native'
import { colors } from '../config'
import { Query } from 'react-apollo'
import listMyTagsQuery from '../queries/listMyTags'
import { AppContext } from '../App'

class TagSelect extends Component {

  render() {
    return (
      <AppContext.Consumer>
        {app => {

          console.log('searh tags:', app)
          const addSearchTag = (tag) => {
            app.setSearchTags([
              ...app.searchTags,
              tag
            ])
          }

          const removeSearchTag = (tag) => {
            
          }

          return (
            <Query query={listMyTagsQuery}>
              {({ loading, error, data: { listMyTags } }) => {

                if (loading) return <Text>Loading...</Text>;
                if (error) return <Text>Error :(</Text>;

                return (
                  <Outer horizontal={true}>
                    {/*<Text style={{color: 'white'}}>{JSON.stringify(app.searchTags, null, 2)}</Text>*/}
                    {app.searchTags.map((tag, i) =>
                      <Tag activeOpacity={0.8} key={i} onPress={removeSearchTag} active>
                        <TagText active>{tag}</TagText>
                      </Tag>
                    )}
                    {listMyTags.items.map((item, i) =>
                      <Tag activeOpacity={0.8} key={i} onPress={() => addSearchTag(item.slug)}>
                        <TagText>{item.slug}</TagText>
                      </Tag>
                    )}
                  </Outer>
                )
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
`

const TagText = styled.Text`
  color: ${props => props.active ? 'black' : colors.primary};
`


export default TagSelect 
