import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Keyboard,
  ImageBackground,
  StyleSheet,
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
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: Color.ErrorRed,
            }}>
            {this.props.signupError.details}
          </Text>
        </View>
      );
    }
  }

  _renderPendingFooter() {
    if (this.props.signupPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 35,
              width: 35,
            }}></ImageBackground>
        </View>
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
              paddingTop: 50,
              alignItems: 'center',
              // borderWidth: 1,
              // borderColor: 'red'
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: '90%',
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: Color.GreyBlue,
                    marginBottom: 20,
                  }}>
                  Logo Here
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 22,
                  color: Color.GreyBlue,
                  marginBottom: 20,
                }}>
                Join Grabbit
              </Text>
              {this._renderErrorHeader()}
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'blue',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <TextInput
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
                    this.props.updateSignupValue('phone', text);
                  }}
                  placeholder={' '}
                />
              </View>
              <TextInput
                value={this.props.email}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('email', text);
                }}
                autoCompleteType={'email'}
                label={'Email'}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerStyle}
                placeholder="ava.campo@gmail.com"
              />
              <TextInput
                value={this.props.secret}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('secret', text);
                }}
                secureTextEntry={true}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerStyle}
                label={'Password'}
                placeholder="**********"
              />
              <TextInput
                value={this.props.invitationCode}
                inputStyle={styles.inputStyle}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.props.updateSignupValue('invitation_code', text);
                }}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                label={'Invitation Code'}
                placeholder="5-digit code (e.g., XY43D)"
              />
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <GrabbitButton
                  onPress={() => {
                    const options = {
                      endpoint: '/users/accounts/',
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      data: {
                        email: this.props.email,
                        secret: this.props.secret,
                        phone: this.props.countryCode + this.props.phone,
                        invitation_code: this.props.invitationCode,
                      },
                    };

                    return this.props.postUserSignup(options);
                  }}
                  _buttonStyle={{
                    backgroundColor: Color.White,
                    borderWidth: 1,
                    borderColor: Color.GreyBlue,
                  }}
                  titleStyle={{
                    color: Color.GreyBlue,
                    fontWeight: 'bold',
                  }}
                  title="Create Account"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Color.ReadableGreyText,
                    fontSize: 11,
                  }}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => Actions.login()}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 11,
                      textDecorationLine: 'underline',
                      color: Color.HyperlinkBlue,
                    }}>
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

      return Actions.listDeal();
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
    secret: getStateForKey('state.session.authentication.input.signup.secret', state),
    email: getStateForKey('state.session.authentication.input.signup.email', state),
    countryCode: getStateForKey('state.session.authentication.input.signup.country_code', state),
    invitationCode: getStateForKey('state.session.authentication.input.signup.invitation_code', state),
    phone: getStateForKey('state.session.authentication.input.signup.phone', state),
    signupPending: getStateForKey('state.session.authentication.pending', state),
    signupError: getStateForKey('state.session.authentication.error', state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  labelStyle: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  inputStyle: {
    fontSize: 16,
  },
  containerStyle: {
    width: '95%',
    paddingBottom: 5,
    marginTop: 10,
    height: 60,
  },
});
