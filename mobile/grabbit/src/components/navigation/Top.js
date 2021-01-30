import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Color} from 'grabbit/src/lib/Const';
import {Actions} from 'react-native-router-flux';
// IMPORTANT: https://stackoverflow.com/a/55040425/4701228
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getStateForKey} from 'grabbit/src/lib/Utils';
import {not} from 'react-native-reanimated';

class BasicTopNavigationBar extends React.Component {
  render() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'orange',
          flex: 1,
          height: 85,
          backgroundColor: Color.TopNavBackground,
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLightGrey,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: 40,
            height: 40,
            position: 'absolute',
            left: 20,
            top: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon name="chevron-back" size={25} color={Color.Black} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            marginTop: 40,
            height: 40,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.Black,
            }}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

class MainTopNavigationBar extends React.Component {
  _renderNewNotificationIcon() {
    if (!this.props.hasNewNotification) {
      return;
    }
    console.log('I HAVE A NEW ONE');
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
          backgroundColor: Color.Teal,
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
  const notifications = getStateForKey('state.notifications.list.items', state);
  const hasNewNotification = Object.values(notifications).filter((item) => !item.seen_at).length > 0;

  return {
    hasNewNotification,
  };
};

module.exports = {
  MainTopNavigationBar: connect(mapStateToProps, null)(MainTopNavigationBar),
  BasicTopNavigationBar: connect(mapStateToProps, null)(BasicTopNavigationBar),
};
