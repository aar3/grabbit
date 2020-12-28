import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
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
            <TextInput autoCompleteType={'email'} label={'Email'} labelStyle={labelStyle} placeholder="you@gmail.com" />
            <TextInput secureTextEntry={true} labelStyle={labelStyle} label={'Password'} placeholder="**********" />
            <GrabbitButton
              onPress={() => Actions.listRewards()}
              _buttonStyle={{
                backgroundColor: Color.Purple,
              }}
              titleStyle={{
                color: Color.White,
                fontWeight: 'bold',
              }}
              title="Login"
            />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{color: Color.ReadableGreyText}}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => Actions.signup()}>
                <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: Color.HyperlinkBlue}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    postUserLogin: async function ({stateKey = 'state.user', operation = 'replace', options}) {
      dispatch({
        type: ReduxActions.POST_USER_LOGIN_PENDING,
      });

      const {data, error} = await httpRequest({options});

      if (error) {
        return dispatch({
          type: ReduxActions.GENERIC_ACTION,
          error,
        });
      }

      return dispatch({
        type: ReduxActions.GENERIC_ACTION,
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
