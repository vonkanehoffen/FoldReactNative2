import React from 'react'
import { Button, View } from 'react-native'

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: '#f0f',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
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