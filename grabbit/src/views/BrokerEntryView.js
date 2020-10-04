import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color, UserType} from 'grabbit/src/const';

class BrokerEntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {setUserType} = this.props;
    return setUserType({userType: UserType.Broker});
  }

  render() {
    const {userType} = this.props;
    return (
      <View style={styles.BrokerEntryView}>
        <ImageBackground
          style={styles.BrokerEntryView__BackgroundImage}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          <View style={styles.BrokerEntryView__ContentContainer}>
            <View style={styles.BrokerEntryView__ContentContainer__LogoContainer}>
              <Image
                source={require('../../assets/imgs/Grabbit_White_G_300x300.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <Text style={styles.BrokerEntryView__ContentContainer__HeaderLabel}>{'For Grabbers'}</Text>

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

            <View style={styles.BrokerEntryView__Actions__Container}>
              <BasicButton
                buttonStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Broker}
                titleStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Title__Broker}
                title="Login"
                onPress={() => {
                  return Actions.brokerLoginView();
                }}
              />

              <BasicButton
                buttonStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Merchant}
                titleStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Title__Merchant}
                title="Sign Up"
                onPress={() => {
                  return Actions.brokerSignupView();
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
        payload: {userType},
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {userType} = state;
  return {
    userType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrokerEntryView);

const styles = StyleSheet.create({
  BrokerEntryView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Color.Pink2,
  },
  BrokerEntryView__BackgroundImage: {
    flex: 1,
    width: '110%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  BrokerEntryView__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  BrokerEntryView__ContentContainer__LogoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 98,
    height: 100,
    marginBottom: 30,
  },
  BrokerEntryView__Actions__Container: {
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  BrokerEntryView__Actions__Container__UserTypeButton__Broker: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    backgroundColor: Color.White,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
  },
  BrokerEntryView__Actions__Container__UserTypeButton__Merchant: {
    width: 300,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.White,
    borderRadius: 40,
    marginBottom: 10,
  },
  BrokerEntryView__Actions__Container__UserTypeButton__Title__Broker: {
    color: Color.Pink2,
    fontWeight: 'bold',
  },
  BrokerEntryView__Actions__Container__UserTypeButton__Title__Merchant: {
    color: Color.White,
    fontWeight: 'bold',
  },
  BrokerEntryView__ContentContainer__HeaderLabel: {
    color: Color.White,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 160,
  },
});
