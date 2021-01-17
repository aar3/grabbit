import React from 'react';
import {View, Image, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Color} from 'grabbit/src/Const';
import {Actions} from 'react-native-router-flux';
// IMPORTANT: https://stackoverflow.com/a/55040425/4701228
import Icon from 'react-native-vector-icons/Ionicons';
import PlaidLink from 'react-native-plaid-link-sdk';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';

class MainTopNavigationBar extends React.Component {
  _renderNewNotificationIcon() {
    if (!this.props.hasNewNotification) {
      return;
    }
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 100,
          position: 'absolute',
          top: 3,
          right: 0,
          zIndex: 999,
          backgroundColor: Color.HotPink,
        }}></View>
    );
  }
  render() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'orange',
          height: 85,
          backgroundColor: Color.TopNavBackground,
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLightGrey,
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            flexDirection: 'row',
            marginTop: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => Actions.listDeal()}>
            <ImageBackground
              source={require('./../../../assets/imgs/Grabbit_Black_Letters_111x500.png')}
              style={{
                height: 24,
                width: 108,
              }}></ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              borderRadius: 50,
              position: 'absolute',
              right: 50,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.account()}>
              <Icon name="person-outline" size={25} type="MaterialIcons" color={Color.Black} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              borderRadius: 50,
              position: 'absolute',
              right: 10,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.notifications()}>
              <View
                style={
                  {
                    // borderWidth: 1,
                    // borderColor: 'red',
                    // height: 30,
                    // width: 30,
                  }
                }>
                {this._renderNewNotificationIcon()}
                <Icon name="chatbubble-outline" size={25} type="MaterialIcons" color={Color.Black} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    hasNewNotification: getStateForKey('state.notifications.hasNewNotification', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
};

module.exports = {
  MainTopNavigationBar: connect(mapStateToProps, mapDispatchToProps)(MainTopNavigationBar),
};
