import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {TextInput, GrabbitButton} from 'grabbit/src/components/Basic';
import {Color} from 'grabbit/src/Const';
import {httpRequest, getStateForKey} from 'grabbit/src/Utils';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDisabled: true,
    };
  }

  _renderPendingFooter() {
    if (this.props.loginPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              marginTop: 20,
              height: 35,
              width: 35,
            }}></ImageBackground>
        </View>
      );
    }
  }

  _renderErrorHeader() {
    const {loginError} = this.props;
    if (loginError) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{color: Color.ErrorRed}}>{loginError.details}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={true}
          style={{
            flex: 1,
            paddingTop: 50,
            backgroundColor: Color.White,
            alignItems: 'center',
            backgroundColor: Color.QueenBlue,
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              paddingLeft: 10,
              width: '100%',
              paddingTop: 10,
            }}>
            {this._renderErrorHeader()}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 22,
                textAlign: 'center',
                color: Color.QueenBlue,
                marginBottom: 10,
              }}>
              Logo Here
            </Text>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                flexDirection: 'row',
                width: '100%',
              }}>
              <TextInput
                disabled={true}
                labelStyle={styles.labelStyle}
                label={'Phone'}
                inputStyle={styles.inputStyle}
                value={this.props.countryCode}
                onChangeText={() => {}}
                containerStyle={{
                  width: 60,
                  paddingBottom: 5,
                  height: 60,
                }}
                placeholder={''}
              />
              <TextInput
                labelStyle={styles.labelStyle}
                label={' '}
                inputStyle={styles.inputStyle}
                value={this.props.phone}
                onChangeText={(text) => {
                  this.props.updateLoginValue('phone', text);
                }}
                placeholder={' '}
              />
            </View>
            <View>
              <TextInput
                secureTextEntry={true}
                labelStyle={styles.labelStyle}
                label={'Password'}
                inputStyle={styles.inputStyle}
                containerStyle={{
                  width: '90%',
                  paddingBottom: 5,
                  marginTop: 10,
                  height: 60,
                }}
                value={this.props.secret}
                onChangeText={(text) => {
                  this.props.updateLoginValue('secret', text);
                }}
                placeholder="**********"
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <GrabbitButton
                onPress={() => {
                  return this.props.postUserLogin({
                    endpoint: '/users/login/',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    data: {
                      phone: this.props.countryCode + this.props.phone,
                      secret: this.props.secret,
                    },
                  });
                }}
                _buttonStyle={{
                  backgroundColor: Color.White,
                  borderColor: Color.QueenBlue,
                  borderWidth: 1,
                }}
                titleStyle={{
                  color: Color.QueenBlue,
                  fontWeight: 'bold',
                }}
                title="Login"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Color.White,
                  fontSize: 11,
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => Actions.signup()}>
                <Text
                  style={{
                    // fontWeight: 'bold',
                    fontSize: 11,
                    textDecorationLine: 'underline',
                    color: Color.White,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            {this._renderPendingFooter()}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postUserLogin: async function (options) {
      dispatch({
        type: ReduxActions.Session.ResetAuthError,
      });

      dispatch({
        type: ReduxActions.Session.PostUserLoginPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        error.details = error.details.endsWith('404') ? 'Account not found' : error.details;

        return dispatch({
          type: ReduxActions.Session.PostUserLoginError,
          payload: error,
        });
      }

      dispatch({
        type: ReduxActions.Session.PostUserLoginSuccess,
        payload: data,
      });

      return Actions.listDeal();
    },

    updateLoginValue: function (key, value) {
      return dispatch({
        type: ReduxActions.Session.UpdateLoginValue,
        payload: value,
        key,
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    loginPending: getStateForKey('state.session.authentication.pending', state),
    phone: getStateForKey('state.session.authentication.input.login.phone', state),
    countryCode: getStateForKey('state.session.authentication.input.login.country_code', state),
    secret: getStateForKey('state.session.authentication.input.login.secret', state),
    loginError: getStateForKey('state.session.authentication.error', state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  labelStyle: {
    fontWeight: 'normal',
    fontSize: 12,
    marginBottom: 5,
    color: Color.White,
  },

  inputStyle: {
    fontSize: 16,
  },
});
