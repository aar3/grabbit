import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class TermsAndConditionsView extends React.Component {
  render() {
    return (
      <View style={styles.TermsAndConditionsView}>
        <Text>{'TermsAndConditionsView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TermsAndConditionsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
