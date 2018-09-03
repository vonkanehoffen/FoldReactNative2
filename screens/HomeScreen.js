import React from 'react'
import { Text, View, ScrollView, Button, AsyncStorage, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'
import client from '../ApolloAppSyncClient'
import MyFolds from '../containers/MyFolds'
import AddButton from '../components/AddButton'
import styled from 'styled-components'
import HeaderSearch from '../containers/HeaderSearch'
import TagSelect from '../containers/TagSelect'

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderSearch/>
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <Outer>
        <TagSelect/>
        <MyFolds/>
        <AddButton onPress={() => navigate('CreateFold')}/>
      </Outer>
    );
  }

}

const Outer = styled.View`
  height: 100%;
  max-height: 100%;
  background: black;
`

export default HomeScreen