import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ConversationsView extends React.Component {
  render() {
    return (
      <View style={styles.ConversationsView}>
        <Text>{'ConversationsView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ConversationsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
