import React from 'react';
import {StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';

import {Color, Font} from 'grabbit/src/const';

export default class BrokerSignupView extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.LogoContainer}>
            <Image
              source={require('../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
              style={{flex: 1, height: undefined, width: undefined}}
            />
          </View>

          <BasicTextInput label="Full Name" />
          <BasicTextInput label="Phone" />
          <BasicTextInput label="Password" />

          <BasicButton
            title="Sign Up"
            buttonStyle={{
              width: 300,
              height: 50,
              justifyContent: 'center',
              borderColor: Color.Pink2,
              borderWidth: 1,
              backgroundColor: Color.White,
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 10,
              marginBottom: 10,
            }}
            titleStyle={{
              color: Color.Pink2,
              fontWeight: 'bold',
            }}
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
  LogoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 50,
    height: 50,
    marginBottom: 20,
    marginTop: 20,
  },
});
