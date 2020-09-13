import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import ACTIONS from 'grabbit/src/actions';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color} from 'grabbit/src/const';

class BrokerEntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userType} = this.props;
    return (
      <View style={styles.BrokerEntryView}>
        <View style={styles.BrokerEntryView__ContentContainer}>
          <View style={styles.BrokerEntryView__ContentContainer__LogoContainer}>
            <Image
              source={require('../../assets/imgs/placeholder.jpg')}
              style={{flex: 1, height: undefined, width: undefined}}
            />
          </View>

          <View style={styles.BrokerEntryView__Actions__Container}>
            <BasicButton
              buttonStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Broker}
              titleStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Title__Broker}
              title="Login"
              onPress={() => Actions.brokerLogin()}
            />

            <BasicButton
              buttonStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Merchant}
              titleStyle={styles.BrokerEntryView__Actions__Container__UserTypeButton__Title__Merchant}
              title="Sign Up"
              onPress={() => Actions.brokerSignup()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BrokerEntryView);

const styles = StyleSheet.create({
  BrokerEntryView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Pink2,
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
    width: 100,
    height: 100,
    marginBottom: 300,
  },
  BrokerEntryView__Actions__Container: {
    // borderColor: 'red',
    // borderWidth: 1,
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
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 200,
  },
  BrokerEntryView__ContentContainer__Continue: {
    backgroundColor: Color.Pink2,
    borderRadius: 30,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});