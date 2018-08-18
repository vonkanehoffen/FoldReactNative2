import React from 'react'
import { Text, View, ScrollView, Button, AsyncStorage, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'
import { client } from '../App'
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
      <View>
        <TagSelect/>
        <MyFolds/>
        <AddButton onPress={() => navigate('CreateFold')}/>
      </View>
    );
  }

}


export default HomeScreen