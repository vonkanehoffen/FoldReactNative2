import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFieldLight from '../components/TextFieldLight'
import TagView from '../components/TagView'
import { Text, View } from 'react-native'
import listMyTagsQuery from '../queries/listMyTags'
import { Query } from 'react-apollo'

class CreateTagSelect extends Component {

  static defaultProps = {}
  static propTypes = {
    selectedTags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired,
  }

  state = {
    tagInput: '',
  }

  addTag = (tag) => {
    this.props.setTags([
      ...this.props.selectedTags,
      tag
    ])
    this.setState({tagInput: ''})
  }

  removeTag = (tag) => {
    this.props.setTags([
      ...this.props.selectedTags.filter(s => s!== tag)
    ])
  }

  render() {
    return (
      <Query query={listMyTagsQuery}>
        {({ loading, error, data: { listMyTags } }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;

          return (
            <View>
              <TextFieldLight
                label="Tag"
                value={this.state.tagInput}
                onChangeText={tagInput => this.setState({tagInput})}
                onSubmitEditing={() => {
                  this.addTag(this.state.tagInput)
                  this.setState({ tagInput: '' })
                }}
              />
              <TagView
                selectedTags={this.props.selectedTags}
                availableTags={listMyTags.items}
                filterString={this.state.tagInput}
                addTag={this.addTag}
                removeTag={this.removeTag}
                lightBg
              />
            </View>
          )
        }}
      </Query>
    )

  }

}


export default CreateTagSelect 
