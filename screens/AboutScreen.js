import React from 'react'
import { Button, View, Text } from 'react-native'
import ScreenHeading from '../components/ScreenHeading'

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScreenHeading>ABOUT</ScreenHeading>
        <Text>Content here</Text>
      </View>
    );
  }
}

export default AboutScreen