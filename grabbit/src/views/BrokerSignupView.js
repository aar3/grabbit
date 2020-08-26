import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';

export default class BrokerSignupView extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.container}>
          <BasicTextInput label="Email" />
          <BasicTextInput label="Name" />
          <BasicTextInput label="Phone" />
          <BasicTextInput label="Password" />
          <BasicButton
            title="Sign Up"
            onPress={() => Actions.brokerFurtherDetails()}
          />
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
