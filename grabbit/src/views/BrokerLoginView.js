import React from 'react';
import {StyleSheet, Image, Text, View, KeyboardAvoidingView} from 'react-native';

import {BasicTextInput} from 'grabbit/src/components/TextInput';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Actions} from 'react-native-router-flux';

import {Color, Font} from 'grabbit/src/const';

export default class BrokerLoginView extends React.Component {
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
          <BasicTextInput label="Phone" />
          <BasicTextInput label="Password" />

          <BasicButton
            title="Login"
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
            onPress={() => Actions.discover()}
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
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: 20,
  },
});
