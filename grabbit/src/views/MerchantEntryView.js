import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import ACTIONS from 'grabbit/src/actions';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color} from 'grabbit/src/const';

class MerchantEntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userType} = this.props;
    return (
      <View style={styles.MerchantEntryView}>
        <ImageBackground
          style={styles.MerchantEntryView__BackgroundImage}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          <View style={styles.MerchantEntryView__ContentContainer}>
            <View style={styles.MerchantEntryView__ContentContainer__LogoContainer}>
              <Image
                source={require('../../assets/imgs/Grabbit_White_G_300x300.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <Text style={styles.MerchantEntryView__ContentContainer__HeaderLabel}>{'For Brands'}</Text>

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

            <View style={styles.MerchantEntryView__Actions__Container}>
              <BasicButton
                buttonStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Broker}
                titleStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Title__Broker}
                title="Login"
                onPress={() => {
                  return Actions.notifications();
                }}
              />

              <BasicButton
                buttonStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Merchant}
                titleStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Title__Merchant}
                title="Sign Up"
                onPress={() => {
                  return Actions.merchantSignup();
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
  return {};
};

const mapStateToProps = (state) => {
  const {userType} = state;
  return {
    userType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEntryView);

const styles = StyleSheet.create({
  MerchantEntryView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Color.Pink2,
  },
  MerchantEntryView__BackgroundImage: {
    flex: 1,
    width: '110%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  MerchantEntryView__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  MerchantEntryView__ContentContainer__LogoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 98,
    height: 100,
    marginBottom: 30,
  },
  MerchantEntryView__Actions__Container: {
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Broker: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    backgroundColor: Color.White,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Merchant: {
    width: 300,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.White,
    borderRadius: 40,
    marginBottom: 10,
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Title__Broker: {
    color: Color.Pink2,
    fontWeight: 'bold',
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Title__Merchant: {
    color: Color.White,
    fontWeight: 'bold',
  },
  MerchantEntryView__ContentContainer__HeaderLabel: {
    color: Color.White,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 200,
  },
});
