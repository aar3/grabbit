import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Actions} from 'react-native-router-flux';

export default class BrokerLoginView extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.container}>
          <BasicTextInput label="Email" />
          <BasicTextInput label="Password" />
          <BasicButton title="Login" onPress={() => Actions.discover()} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
