import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class PrivacyPolicyView extends React.Component {
  render() {
    return (
      <View style={styles.PrivacyPolicyView}>
        <Text>{'PrivacyPolicyView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PrivacyPolicyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
