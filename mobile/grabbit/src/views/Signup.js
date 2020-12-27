import React from 'react';
import {View, Text, KeyboardAvoidingView, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {TextInput, GrabbitButton} from 'grabbit/src/components/Basic';
import {Color} from 'grabbit/src/Const';
import {httpRequest} from 'grabbit/src/Utils';

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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={true}
          keyboardVerticalOffset={75}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
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
            <TextInput label={'Name'} labelStyle={labelStyle} placeholder="Your name (Ex: Ava Washington)" />
            <TextInput autoCompleteType={'tel'} label={'Phone'} labelStyle={labelStyle} placeholder="+1 555-555-5555" />
            <TextInput
              autoCompleteType={'email'}
              label={'Email'}
              labelStyle={labelStyle}
              placeholder="ava.washington@gmail.com"
            />
            <TextInput secureTextEntry={true} labelStyle={labelStyle} label={'Password'} placeholder="**********" />
            <TextInput
              secureTextEntry={true}
              labelStyle={labelStyle}
              label={'Confirm Password'}
              placeholder="**********"
            />
            <TextInput labelStyle={labelStyle} label={'Invitation Code'} placeholder="5-digit code (e.g., XY43D)" />
            <GrabbitButton
              onPress={() => Actions.login()}
              _buttonStyle={{
                backgroundColor: Color.Purple,
              }}
              titleStyle={{
                color: Color.White,
                fontWeight: 'bold',
              }}
              title="Create Account"
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    postUserSignup: async function ({stateKey = 'state.user', operation = 'replace', options}) {
      dispatch({
        type: ReduxActions.GENERIC_ACTION,
      });

      const {data, error} = await httpRequest({options});

      if (error) {
        return dispatch({
          type: ReduxActions.GENERIC_ACTION,
          error,
        });
      }

      return dispatch({
        payload: data,
        stateKey,
        operation,
      });
    },
  };
};

const mapStateToProps = function (state) {
  return {};
};
