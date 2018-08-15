import React from 'react'
import { Text, View, ScrollView, Button, AsyncStorage, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'
import { client } from '../App'
import MyFolds from './MyFolds'
import AddButton from '../components/AddButton'
import styled from 'styled-components'
import ToolbarMenu from './ToolbarMenu'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        <Button title="Show me more of the app" onPress={this._showMoreApp}/>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        <MyFolds filter={[]}/>
        <AddButton onPress={() => navigate('CreateFold')}/>
      </ScrollView>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await Auth.signOut()
    client.resetStore()
    this.props.navigation.navigate('Auth');
  };
}


export default HomeScreen