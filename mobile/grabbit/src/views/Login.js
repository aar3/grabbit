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
              marginBottom: 20,
            }}></ImageBackground>
        </View>
      );
    }
  }

  _validateLoginForm() {
    let loginDisabled = true;
    const {secret, area_code, line_number, prefix} = this.props.loginData;

    const conditions = [
      !area_code,
      !line_number,
      !prefix,
      !secret,
      area_code && area_code.length !== 3,
      line_number && line_number.length !== 4,
      prefix && prefix.length !== 3,
    ];

    loginDisabled = conditions.some((condition) => condition);

    this.setState({loginDisabled});
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
            marginBottom: 20,
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
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              paddingLeft: 10,
              width: '100%',
              paddingTop: 10,
              // alignItems: 'center',
            }}>
            {this._renderErrorHeader()}
            <Text
              style={{
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 22,
                color: Color.QueenBlue,
              }}>
              Welcome back
            </Text>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                marginTop: 10,
              }}>
              <TextInput
                containerStyle={{
                  width: 70,
                }}
                autoCorrect={false}
                keyboardType={'number-pad'}
                label={'Phone'}
                value={this.props.loginData.area_code}
                labelStyle={styles.labelStyle}
                inputStyle={{
                  fontSize: 16,
                }}
                placeholder={'555'}
                onChangeText={(text) => {
                  this.props.updateLoginValue('area_code', text);
                  this._validateLoginForm();
                }}
              />
              <Text>-</Text>
              <TextInput
                containerStyle={{
                  width: 70,
                }}
                autoCorrect={false}
                keyboardType={'number-pad'}
                label={' '}
                value={this.props.loginData.prefix}
                placeholder={'555'}
                labelStyle={styles.labelStyle}
                inputStyle={{
                  fontSize: 16,
                }}
                onChangeText={(text) => {
                  this.props.updateLoginValue('prefix', text);
                  this._validateLoginForm();
                }}
              />
              <Text>-</Text>
              <TextInput
                containerStyle={{
                  width: 125,
                }}
                autoCorrect={false}
                keyboardType={'number-pad'}
                label={' '}
                placeholder={'5555'}
                inputStyle={{
                  fontSize: 16,
                }}
                value={this.props.loginData.line_number}
                labelStyle={styles.labelStyle}
                onChangeText={(text) => {
                  this.props.updateLoginValue('line_number', text);
                  this._validateLoginForm();
                }}
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                width: '100%',
              }}>
              <TextInput
                secureTextEntry={true}
                labelStyle={styles.labelStyle}
                label={'Password'}
                inputStyle={{
                  fontSize: 16,
                }}
                value={this.props.loginData.secret}
                onChangeText={(text) => {
                  this.props.updateLoginValue('secret', text);
                  this._validateLoginForm();
                }}
                containerStyle={{
                  width: 400,
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
                marginTop: 5,
              }}>
              <GrabbitButton
                // disabled={this.state.loginDisabled}
                onPress={() => {
                  const {area_code, prefix, line_number} = this.props.loginData;
                  return this.props.postUserLogin({
                    endpoint: '/users/login/',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    data: {
                      phone: `${area_code}-${prefix}-${line_number}`,
                      secret: this.props.loginData.secret,
                    },
                  });
                }}
                _buttonStyle={{
                  backgroundColor: Color.QueenBlue,
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
                  color: Color.ReadableGreyText,
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => Actions.signup()}>
                <Text
                  style={{
                    fontWeight: 'bold',
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
    loginData: getStateForKey('state.session.authentication.input.login', state),
    loginError: getStateForKey('state.session.authentication.error', state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  labelStyle: {
    fontWeight: 'normal',
    fontSize: 12,
  },
});
