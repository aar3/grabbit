import React from 'react';
import {View, Text, KeyboardAvoidingView, Image} from 'react-native';
import {TextInput, GrabbitButton, PasswordInput} from 'grabbit/src/components/Basic';
import {Color} from 'grabbit/src/const';

export default class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const labelStyle = {
      fontWeight: 'normal',
    };

    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        enabled={true}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'red',
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginBottom: 20,
              height: 50,
              width: 50,
            }}>
            <Image
              source={require('./../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
              style={{flex: 1, height: undefined, width: undefined}}
            />
          </View>
          <TextInput label={'Email'} labelStyle={labelStyle} placeholder="you@gmail.com" />
          <PasswordInput labelStyle={labelStyle} label={'Password'} placeholder="******" />
          <GrabbitButton
            onPress={() => Actions.login()}
            _buttonStyle={{
              backgroundColor: Color.Purple,
            }}
            titleStyle={{
              color: Color.White,
              fontWeight: 'bold',
            }}
            title="Login"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
