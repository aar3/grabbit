import React from 'react';
import {View, Text} from 'react-native';

export default class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>LinkAccount View</Text>
      </View>
    );
  }
}
