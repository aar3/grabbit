import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class AboutGrabbitView extends React.Component {
  render() {
    return (
      <View style={styles.AboutGrabbitView}>
        <Text>{'AboutGrabbitView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AboutGrabbitView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
