import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Actions} from 'react-native-router-flux';

export default class BrokerFurtherDetails extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.container}>
          <BasicTextInput label="Address Line 1" />
          <BasicTextInput label="Address Line 2" />
          <BasicTextInput label="City" />
          <BasicTextInput label="State" />
          <BasicTextInput label="Zip" />

          <BasicButton title="Finish" onPress={() => Actions.discover()} />
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
