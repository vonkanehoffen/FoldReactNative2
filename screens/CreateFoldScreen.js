import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, Button, AsyncStorage, StyleSheet, ActivityIndicator, TextInput, Text, ScrollView, KeyboardAvoidingView, Animated, Keyboard } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import styled from 'styled-components'
// import TagSelect from '../containers/TagSelect'
import { Mutation } from 'react-apollo'
import listMyFoldsQuery from '../queries/listMyFolds'
import createFoldQuery from '../queries/createFold'
import { colors } from '../config'
import TextFieldLight from '../components/TextFieldLight'
import BigButton from '../components/BigButton'
import TagView from '../components/TagView'
import CreateTagSelect from '../containers/CreateTagSelect'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class CreateFoldScreen extends Component {

  static navigationOptions = {
    title: 'New',
  }

  static propTypes = {}
  state = {
    title: '',
    uri: '',
    content: '',
    tags: [],
  }

  setTags = (tags) => this.setState({ tags })

  render() {

    const { title, uri, content, tags } = this.state

    // TODO: Make a better keyboard avoidance thing... Tag select is rubbish.
    // https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior="padding"
        style={{
          // flex: 1,
          backgroundColor: colors.primary,
        }}
        ref={ref => this.keyboardAvoider = ref}
      >
      <Mutation
        mutation={createFoldQuery}
        variables={this.state}
        update={(dataProxy, { data: { createFold } }) => {
          const query = listMyFoldsQuery;
          const data = dataProxy.readQuery({ query });
          console.log('MUTATE:', createFold)
          data.listMyFolds.items.unshift(createFold);
          dataProxy.writeQuery({ query, data });
        }}
          //
          // (cache, { data: { createFold }}) => {
          // const { listMyFolds }  = cache.readQuery({ query: listMyFoldsQuery })
          // cache.writeQuery({
          //   query: listMyFoldsQuery,
          //   data: { listMyFolds: { ...listMyFolds, items: [ createFold, ...listMyFolds.items ] } }
          // })
          // this.setState({ title: '', uri: '', content: '', tags: []})
          // this.props.navigation.navigate('Home')
          // }}
        optimisticResponse={{
          createFold: {
            title: title,
            uri,
            content,
            tags,
            id: Math.round(Math.random() * -1000000),
            ownerId: '',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            __typename: 'Fold',
            version: 1,
          }
        }}
        refetchQueries={[listMyFoldsQuery]}
      >
        {(createFold, response) => {
          if(response.loading) return <ActivityIndicator/>
          if(response.error) return <View>Error: {JSON.stringify(response.error, null, 2)}</View>

          return (
              <ScrollView>
                <TextFieldLight
                  label="Title simple"
                  value={this.state.title}
                  onChangeText={title => this.setState({title})}
                />
                <TextFieldLight
                  label="Content"
                  value={this.state.content}
                  onChangeText={content => this.setState({content})}
                />
                <CreateTagSelect selectedTags={this.state.tags} setTags={this.setTags}/>
                <TextFieldLight
                  label="URI"
                  value={this.state.uri}
                  onChangeText={uri => this.setState({uri})}
                />
                <BigButton title="Save" onPress={()=> createFold()} dark/>
                <View style={{height: 800}}/>
              </ScrollView>
          )
        }}
      </Mutation>
      </KeyboardAvoidingView>
    )
  }

}

// const Outer = styled.ScrollView`
//   padding: 10px;
// `

export default CreateFoldScreen
