import React from 'react'
import { Text, View, ScrollView, Button, AsyncStorage, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'
import { client } from '../App'
import MyFolds from './MyFolds'
import AddButton from '../components/AddButton'
import styled from 'styled-components'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        <MyFolds filter={[]}/>
        <AddButton onPress={() => navigate('CreateFold')}/>
      </ScrollView>
    );
  }

}


export default HomeScreen