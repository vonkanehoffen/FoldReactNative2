import React from 'react'
import { Button, View } from 'react-native'

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Go to Jane's profile"
          onPress={() =>
            navigate('Profile', { name: 'Jane' })
          }
        />
        <Button
          title="Go to DickButt's profile"
          onPress={() =>
            navigate('Profile', { name: 'Dickbutt' })
          }
        />
        <Button
          title="Search"
          onPress={() =>
            navigate('Search', { name: 'Dickbutt' })
          }
        />
      </View>
    );
  }
}

export default OtherScreen