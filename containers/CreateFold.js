import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, Button, AsyncStorage, StyleSheet, ActivityIndicator, TextInput, Text } from 'react-native'
import { TextField } from 'react-native-material-textfield';
// import TagSelect from '../containers/TagSelect'
import { Mutation } from 'react-apollo'
import listMyFoldsQuery from '../queries/listMyFolds'
import createFoldQuery from '../queries/createFold'

class CreateFold extends Component {

  static propTypes = {
  }
  state = {
    title: '',
    uri: '',
    content: '',
    tags: [],
  }

  setTags = (tags) => this.setState({tags})

  render() {

    const { title, uri, content, tags } = this.state

    return (
      <Mutation
        mutation={createFoldQuery}
        variables={this.state}
        update={(cache, { data: { createFold }}) => {
          const { listMyFolds }  = cache.readQuery({ query: listMyFoldsQuery })
          cache.writeQuery({
            query: listMyFoldsQuery,
            data: { listMyFolds: { ...listMyFolds, items: [ createFold, ...listMyFolds.items ] } }
          })
          // this.setState({ title: '', uri: '', content: '', tags: []})
          this.props.navigation.navigate('Home')
        }}
        optimisticResponse={{
          createFold: {
            title,
            uri,
            content,
            tags,
            id: Math.round(Math.random() * -1000000),
            ownerId: '',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            __typename: 'Fold',
          }
        }}
      >
        {(createFold, response) => {
          if(response.loading) return <ActivityIndicator/>
          if(response.error) return <View>Error: {JSON.stringify(response.error, null, 2)}</View>
          return (
            <View>
              <Text>Create Fold</Text>
              <TextField
                label="Title"
                value={this.state.title}
                onChangeText={title => this.setState({title})}
              />
              <TextField
                label="URI"
                value={this.state.uri}
                onChangeText={uri => this.setState({uri})}
              />
              <TextField
                label="Content"
                value={this.state.content}
                onChangeText={content => this.setState({content})}
              />
              {/*<TagSelect selectedTags={this.state.tags} setTags={this.setTags}/>*/}
              <Button title="Save" onPress={()=> createFold()}/>
              <Text>{JSON.stringify(this.state, null, 2)}</Text>
            </View>
          )
        }}
      </Mutation>
    )
  }

}

export default CreateFold
