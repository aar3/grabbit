import React from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {BasicTextInput, PasswordInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color} from 'grabbit/src/const';

export default class MerchantLoginView extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.HeaderContainer}>
            <View style={styles.LogoContainer}>
              <Image
                source={require('../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
          </View>

          <BasicTextInput label="Email" />
          <PasswordInput label="Password" />

          <BasicButton
            title="Login"
            titleStyle={{
              color: Color.Pink2,
              fontWeight: 'bold',
            }}
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
            onPress={() => Actions.notifications()}
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
  HeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
    height: 70,
    marginBottom: 20,
  },
  LogoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 50,
    height: 50,
  },
  CustomButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.Pink2,
    borderRadius: 30,
    backgroundColor: Color.Pink2,
    marginTop: 20,
  },
});
