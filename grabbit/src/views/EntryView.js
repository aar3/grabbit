import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import ACTIONS from 'grabbit/src/actions';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color, UserType} from 'grabbit/src/const';

class EntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userType, setUserType} = this.props;
    return (
      <View style={styles.EntryView}>
        <ImageBackground
          style={styles.EntryView__BackgroundImage}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          <View style={styles.EntryView__ContentContainer}>
            <View style={styles.EntryView__ContentContainer__LogoContainer}>
              <Image
                source={require('../../assets/imgs/Grabbit_White_Letters_222x1000.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <Text style={styles.EntryView__ContentContainer__HeaderLabel}>{'Products. For. Promo.'}</Text>

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

            <View style={styles.EntryView__Actions__Container}>
              <BasicButton
                buttonStyle={styles.EntryView__Actions__Container__UserTypeButton__Broker}
                titleStyle={styles.EntryView__Actions__Container__UserTypeButton__Title__Broker}
                title="Grabber"
                onPress={() => {
                  setUserType({userType: UserType.Broker});

                  return Actions.brokerEntry();
                }}
              />

              <BasicButton
                buttonStyle={styles.EntryView__Actions__Container__UserTypeButton__Merchant}
                titleStyle={styles.EntryView__Actions__Container__UserTypeButton__Title__Merchant}
                title="Merchant"
                onPress={() => {
                  setUserType({userType: UserType.Merchant});

                  return Actions.merchantEntry();
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
        type: ACTIONS.SET_USER_TYPE,
        userType,
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryView);

const styles = StyleSheet.create({
  EntryView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Color.Pink2,
  },
  EntryView__BackgroundImage: {
    flex: 1,
    width: '110%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  EntryView__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  EntryView__ContentContainer__LogoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 320,
    height: 70,
    marginBottom: 10,
  },
  EntryView__Actions__Container: {
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  EntryView__Actions__Container__UserTypeButton__Broker: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    backgroundColor: Color.White,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
  },
  EntryView__Actions__Container__UserTypeButton__Merchant: {
    width: 300,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.White,
    borderRadius: 40,
    marginBottom: 10,
  },
  EntryView__Actions__Container__UserTypeButton__Title__Broker: {
    color: Color.Pink2,
    fontWeight: 'bold',
  },
  EntryView__Actions__Container__UserTypeButton__Title__Merchant: {
    color: Color.White,
    fontWeight: 'bold',
  },
  EntryView__ContentContainer__HeaderLabel: {
    color: Color.White,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 200,
  },
});
