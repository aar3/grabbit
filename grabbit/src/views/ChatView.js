import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ChatView extends React.Component {
  render() {
    return (
      <View style={styles.ChatView}>
        <Text>{'ChatView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ChatView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
