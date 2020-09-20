import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BasicButton} from 'grabbit/src/components/buttons';

export default class V extends React.Component {
  render() {
    return (
      <View style={styles.BrokerSuccessfulGrabView}>
        <Text>{'BrokerSuccessfulGrabView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BrokerSuccessfulGrabView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
