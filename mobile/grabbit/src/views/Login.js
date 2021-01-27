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
// import {Picker} from '@react-native-picker/picker';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {TextInput, GrabbitButton, LoadingView, ErrorView} from 'grabbit/src/components/Basic';
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
        <LoadingView
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: 50,
            height: 50,
          }}
        />
      );
    }
  }

  _renderErrorHeader() {
    if (this.props.loginError) {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // height: 400,
          }}>
          <Text
            style={{
              color: Color.ErrorRed,
            }}>
            {this.props.loginError.details}
          </Text>
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
            backgroundColor: Color.White,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'red',
              // paddingLeft: 10,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <View
              style={{
                height: 45,
                // position: 'absolute',
                // top: 400,
                width: 200,
                borderColor: 'blue',
                borderWidth: 1,
              }}>
              <Image
                source={require('./../../assets/imgs/Grabbit_Grey_Letters_222x1000.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 20,
                color: Color.GreyBlue,
                marginBottom: 20,
                marginLeft: 20,
                marginTop: 10,
              }}>
              Login with your phone number
            </Text>
            {this._renderErrorHeader()}
            <View
              style={{
                borderColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                width: '100%',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'blue',
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
                  keyboardType={'number-pad'}
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
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  width: '100%',
                }}>
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
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'red',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
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
                  backgroundColor: Color.GreyBlue,
                  // borderWidth: 1,
                  // borderColor: Color.GreyBlue,
                }}
                titleStyle={{
                  color: Color.White,
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
                  color: Color.GreyBlue,
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
                    color: Color.HyperlinkBlue,
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
