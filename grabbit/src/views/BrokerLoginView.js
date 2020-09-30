import React from 'react';
import {Image, View, Text, TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color} from 'grabbit/src/const';
import {httpRequestAsync} from 'grabbit/src/utils';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderErrorLabel() {
    const {error, invalidEmailValue, invalidPasswordValue} = this.props;

    let errorMsg = error ? error.details : invalidEmailValue ? 'Invalid email' : 'Invalid password';
    if (!error) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
            height: 15,
            marginBottom: 10,
          }}></View>
      );
    }

    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: Color.CherryRed,
          }}>
          {errorMsg}
        </Text>
      </View>
    );
  }

  _disableLoginButton() {
    const {emailValue, passwordValue} = this.props;
    // TODO: validate for a proper email and password
    if (!emailValue) {
      return true;
    }

    if (emailValue.indexOf('@') >= 1) {
      return false;
    }

    return true;
  }

  render() {
    const {emailValue, postLogin, passwordValue, updatePasswordValue, updateEmailValue} = this.props;
    const disableLoginButton = this._disableLoginButton();
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              width: 100,
              height: 100,
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Image
              source={require('../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
              style={{flex: 1, height: undefined, width: undefined}}
            />
          </View>

          {this._renderErrorLabel()}

          <View style={styles.TextInput__Container}>
            <Text style={styles.TextInput__Label}>Email</Text>
            <TextInput
              autoCapitalize={'none'}
              value={emailValue}
              onChangeText={(text) => updateEmailValue({text, key: 'emailValue'})}
              style={styles.TextInput__Container__Input}
            />
          </View>

          <View style={styles.TextInput__Container}>
            <Text style={styles.TextInput__Label}>Password</Text>
            <TextInput
              autoCapitalize={'none'}
              value={passwordValue}
              secureTextEntry
              onChangeText={(text) => updatePasswordValue({text, key: 'passwordValue'})}
              style={styles.TextInput__Container__Input}
            />
          </View>

          <Button
            disabled={disableLoginButton}
            title="Login"
            disabledStyle={{
              width: 300,
              height: 50,
              justifyContent: 'center',
              borderColor: Color.ReadableGreyText,
              borderWidth: 1,
              backgroundColor: Color.White,
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 10,
              marginBottom: 10,
            }}
            disabledTitleStyle={{
              color: Color.ReadableGreyText,
              fontSize: 13,
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
            titleStyle={{
              color: Color.Pink2,
              fontSize: 13,
              fontWeight: 'bold',
            }}
            onPress={postLogin({
              options: {
                endpoint: '/login/',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset-utf8',
                },
                data: {
                  email: emailValue,
                  secret: passwordValue,
                },
              },
            })}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const {login} = state;
  return {
    emailValue: login.emailValue,
    passwordValue: login.passwordValue,
    error: login.error,
    pending: login.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePasswordValue: ({text, key}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_LOGIN_PASSWORD,
        payload: {text, key},
      });
    },
    updateEmailValue: ({text, key}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_LOGIN_EMAIL,
        payload: {key, text},
      });
    },
    postLogin: ({options}) => {
      return async () => {
        dispatch({
          type: REDUX_ACTIONS.CLEAR_POST_LOGIN_ERROR,
        });

        dispatch({
          type: REDUX_ACTIONS.POST_USER_LOGIN_PENDING,
        });

        const {data, error} = await httpRequestAsync({options});

        if (error) {
          if (error.statusCode === 404) {
            error.details = "That user doesn't exist.";
          } else if (error.statusCode === 401) {
            error.details = "That's not the right password.";
          }

          return dispatch({
            type: REDUX_ACTIONS.POST_USER_LOGIN_ERROR,
            pending: false,
            payload: error,
          });
        }

        dispatch({
          type: REDUX_ACTIONS.POST_USER_LOGIN_SUCCESS,
          payload: data,
        });

        return Actions.brokerDiscover();
      };
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  TextInput__Container: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: 300,
    marginBottom: 10,
  },
  TextInput__Container__Input: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    padding: 5,
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'Arial',
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Color.White,
  },
  TextInput__Label: {
    fontSize: 12,
    paddingBottom: 5,
    // fontFamily: Font.Default,
  },
});
