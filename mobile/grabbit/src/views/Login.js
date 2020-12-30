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
import {httpRequest, getStateForKey} from 'grabbit/src/Utils';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderErrorView() {
    const {loginError} = this.props;
    if (loginError) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            marginBottom: 20,
          }}>
          <Text style={{color: Color.ErrorRed}}>{loginError.details}</Text>
        </View>
      );
    }
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
            // justifyContent: 'center',
            paddingTop: 200,
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
            {this._renderErrorView()}
            <TextInput
              autCorrect={false}
              keyboardType={'numeric'}
              label={'Phone'}
              value={this.props.loginData.phone}
              labelStyle={labelStyle}
              onChangeText={(text) => this.props.updateLoginValue('phone', text)}
              placeholder="+1 555-555-5555"
            />
            <TextInput
              secureTextEntry={true}
              labelStyle={labelStyle}
              label={'Password'}
              value={this.props.loginData.secret}
              onChangeText={(text) => this.props.updateLoginValue('secret', text)}
              placeholder="**********"
            />
            <GrabbitButton
              onPress={() =>
                this.props.postUserLogin({
                  endpoint: '/user/login/',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: this.props.loginData,
                })
              }
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
        error.details = error.statusCode === 404 ? 'Account not found' : error.details;
        return dispatch({
          type: ReduxActions.Session.PostUserLoginError,
          payload: error,
        });
      }

      dispatch({
        type: ReduxActions.Session.PostUserLoginSuccess,
        payload: data,
      });

      return Actions.listRewards();
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
    loginData: getStateForKey('state.session.authentication.input.login', state),
    loginError: getStateForKey('state.session.authentication.error', state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
