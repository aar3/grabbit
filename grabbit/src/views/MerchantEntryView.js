import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

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
        <View style={styles.MerchantEntryView__ContentContainer}>
          <View style={styles.MerchantEntryView__ContentContainer__LogoContainer}>
            <Image
              source={require('../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
              style={{flex: 1, height: undefined, width: undefined}}
            />
          </View>

          <View style={styles.MerchantEntryView__Actions__Container}>
            <BasicButton
              buttonStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Broker}
              titleStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Title__Broker}
              title="Login"
              onPress={() => Actions.merchantLogin()}
            />

            <BasicButton
              buttonStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Merchant}
              titleStyle={styles.MerchantEntryView__Actions__Container__UserTypeButton__Title__Merchant}
              title="Sign Up"
              onPress={() => Actions.merchantSignup()}
            />
          </View>
        </View>
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
    backgroundColor: Color.White,
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
    width: 100,
    height: 100,
    marginBottom: 300,
  },
  MerchantEntryView__Actions__Container: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Broker: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    backgroundColor: Color.Pink2,
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
    borderColor: Color.Pink2,
    borderRadius: 40,
    marginBottom: 10,
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Title__Broker: {
    color: Color.White,
    fontWeight: 'bold',
  },
  MerchantEntryView__Actions__Container__UserTypeButton__Title__Merchant: {
    color: Color.Pink2,
    fontWeight: 'bold',
  },
});
