import React from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color, UserType} from 'grabbit/src/const';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {setUserType} = this.props;
    return setUserType({userType: UserType.Merchant});
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: Color.Pink2,
        }}>
        <ImageBackground
          style={{
            flex: 1,
            width: '110%',
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 300,
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: 98,
                height: 100,
                marginBottom: 30,
              }}>
              <Image
                source={require('../../assets/imgs/Grabbit_White_G_300x300.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <Text
              style={{
                color: Color.White,
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 160,
              }}>
              {'For Brands'}
            </Text>

            <View
              style={{
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 20,
                  color: Color.White,
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                {
                  'By tapping Create Account or Sign In, you agree to our Terms. Learn how we process your data in Privacy Policy'
                }
              </Text>
            </View>

            <View
              style={{
                // borderColor: 'red',
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Button
                buttonStyle={{
                  width: 300,
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor: Color.White,
                  alignItems: 'center',
                  borderRadius: 40,
                  marginBottom: 10,
                }}
                titleStyle={{
                  color: Color.Pink2,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                title="Login"
                onPress={() => {
                  return Actions.loginView();
                }}
              />

              <Button
                buttonStyle={{
                  width: 300,
                  height: 50,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Color.White,
                  backgroundColor: null,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
                titleStyle={{
                  color: Color.White,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                title="Sign Up"
                onPress={() => {
                  return Actions.merchantSignupView();
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserType: ({userType}) => {
      return dispatch({
        type: REDUX_ACTIONS.SET_USER_TYPE,
        payload: userType,
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {session} = state;
  return {
    userType: session.userType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
