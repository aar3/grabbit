import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {BasicButton} from 'grabbit/src/components/buttons';
import {Actions} from 'react-native-router-flux';

export default class EntryView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.UpperContentContainer}>
          <BasicButton title="Merchant" />
          <BasicButton title="Grabber" />
        </View>
        <BasicButton title="Login" onPress={() => Actions.brokerLogin()} />
        <BasicButton title="Signup" onPress={() => Actions.brokerSignup()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  UpperContentContainer: {
    borderColor: 'blue',
    flexDirection: 'row',
    borderWidth: 1,
  },
});
