import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Keyboard,
  ImageBackground,
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
    this.state = {
      signupDisabled: true,
    };
  }

  _renderErrorHeader() {
    if (this.props.signupError) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            marginBottom: 20,
          }}>
          <Text style={{color: Color.ErrorRed}}>{this.props.signupError.details}</Text>
        </View>
      );
    }
  }

  _validateSignupForm() {
    let signupDisabled = true;
    const {
      secret,
      first_name,
      last_name,
      email,
      username,
      area_code,
      line_number,
      invitation_code,
      prefix,
    } = this.props.signupData;

    const conditions = [
      !secret,
      secret && secret.length < 5,
      !first_name,
      !username,
      !last_name,
      !email,
      email && (!email.includes('@') || !email.includes('.')),
      !area_code,
      !line_number,
      !prefix,
      area_code && area_code.length !== 3,
      line_number && line_number.length !== 4,
      prefix && prefix.length !== 3,
      !invitation_code,
    ];

    console.log(conditions);
    console.log(this.props.signupData);

    signupDisabled = conditions.some((condition) => condition);

    this.setState({signupDisabled});
  }

  _renderPendingFooter() {
    if (this.props.signupPending) {
      return (
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
      );
    }
  }

  render() {
    const labelStyle = {
      fontWeight: 'normal',
    };

    return (
      <ScrollView
        contentContainerStyle={
          {
            // borderWidth: 1,
            // borderColor: 'blue'
          }
        }>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={150}
            style={{
              flex: 1,
              paddingTop: 100,
              alignItems: 'center',
              // borderWidth: 1,
              // borderColor: 'red'
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
              {this._renderErrorHeader()}
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'blue',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(text) => {
                    this.props.updateSignupValue('first_name', text);
                    this._validateSignupForm();
                  }}
                  containerStyle={{width: 150}}
                  label={'First Name'}
                  labelStyle={labelStyle}
                  placeholder="Ava"
                />
                <TextInput
                  autoCorrect={false}
                  onChangeText={(text) => {
                    this.props.updateSignupValue('last_name', text);
                    this._validateSignupForm();
                  }}
                  containerStyle={{width: 150}}
                  label={'Last Name'}
                  labelStyle={labelStyle}
                  placeholder="Campo"
                />
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'blue',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <TextInput
                  autoCorrect={false}
                  containerStyle={{
                    width: 70,
                  }}
                  autoCorrect={false}
                  keyboardType={'number-pad'}
                  label={'Phone'}
                  value={this.props.signupData.area_code}
                  labelStyle={labelStyle}
                  placeholder={'555'}
                  onChangeText={(text) => {
                    this.props.updateSignupValue('area_code', text);
                    this._validateSignupForm();
                  }}
                />
                <Text>-</Text>
                <TextInput
                  autoCorrect={false}
                  containerStyle={{
                    width: 70,
                  }}
                  autoCorrect={false}
                  keyboardType={'number-pad'}
                  label={' '}
                  value={this.props.signupData.prefix}
                  placeholder={'555'}
                  labelStyle={labelStyle}
                  onChangeText={(text) => {
                    this.props.updateSignupValue('prefix', text);
                    this._validateSignupForm();
                  }}
                />
                <Text>-</Text>
                <TextInput
                  autoCorrect={false}
                  containerStyle={{
                    width: 125,
                  }}
                  autoCorrect={false}
                  keyboardType={'number-pad'}
                  label={' '}
                  placeholder={'5555'}
                  value={this.props.signupData.line_number}
                  labelStyle={labelStyle}
                  onChangeText={(text) => {
                    this.props.updateSignupValue('line_number', text);
                    this._validateSignupForm();
                  }}
                />
              </View>
              <TextInput
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('username', text);
                  this._validateSignupForm();
                }}
                value={this.props.signupData.username}
                label={'Username'}
                labelStyle={labelStyle}
                placeholder="@ava"
              />
              <TextInput
                value={this.props.signupData.email}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('email', text);
                  this._validateSignupForm();
                }}
                autoCompleteType={'email'}
                label={'Email'}
                labelStyle={labelStyle}
                placeholder="ava.campo@gmail.com"
              />
              <TextInput
                value={this.props.signupData.secret}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('secret', text);
                  this._validateSignupForm();
                }}
                secureTextEntry={true}
                labelStyle={labelStyle}
                label={'Password'}
                placeholder="**********"
              />
              <TextInput
                // value={this.props.signupData.invitation_code}
                value={this.props.signupData.invitation_code}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('invitation_code', text);
                  this._validateSignupForm();
                }}
                labelStyle={labelStyle}
                label={'Invitation Code'}
                placeholder="5-digit code (e.g., XY43D)"
              />
              <GrabbitButton
                disabled={this.state.signupDisabled}
                onPress={() => {
                  const reducerData = this.props.signupData;

                  const postData = Object.assign(
                    {},
                    {
                      name: `${reducerData.first_name} ${reducerData.last_name}`,
                      email: reducerData.email,
                      username: reducerData.username,
                      secret: reducerData.secret,
                      phone: `${reducerData.area_code}-${reducerData.prefix}-${reducerData.line_number}`,
                      invitation_code: reducerData.invitation_code,
                    },
                  );
                  const options = {
                    endpoint: '/users/',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    data: postData,
                  };

                  return this.props.postUserSignup(options);
                }}
                _buttonStyle={{
                  backgroundColor: Color.Purple,
                }}
                titleStyle={{
                  color: Color.White,
                  fontWeight: 'bold',
                }}
                title="Create Account"
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{color: Color.ReadableGreyText}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => Actions.login()}>
                  <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', color: Color.HyperlinkBlue}}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              {this._renderPendingFooter()}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    postUserSignup: async function (options) {
      dispatch({
        type: ReduxActions.Session.PostUserSignupPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        error.details = error.details.endsWith('403') ? 'Invalid invitation code' : error.details;
        return dispatch({
          type: ReduxActions.Session.PostUserSignupError,
          payload: error,
        });
      }

      dispatch({
        type: ReduxActions.Session.PostUserSignupSuccess,
        payload: data,
      });

      return Actions.listRewards();
    },
    updateSignupValue: function (key, value) {
      return dispatch({
        type: ReduxActions.Session.UpdateSignupValue,
        payload: value,
        key,
      });
    },
  };
};

const mapStateToProps = function (state) {
  return {
    signupPending: getStateForKey('state.session.authentication.pending', state),
    signupError: getStateForKey('state.session.authentication.error', state),
    signupData: getStateForKey('state.session.authentication.input.signup', state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
