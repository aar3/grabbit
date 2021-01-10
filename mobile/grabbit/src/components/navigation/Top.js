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

class BasicTopNavigationBar extends React.Component {
  _renderBackButton() {
    if (this.props.backButton) {
      return (
        <View
          style={{
            //  borderWidth: 1,
            //  borderColor: 'red',
            position: 'absolute',
            left: 10,
            top: 50,
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon name={'chevron-left'} color={Color.Black} size={25} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'orange',
          flexDirection: 'row',
          height: 90,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLightGrey,
          width: '100%',
        }}>
        {this._renderBackButton()}
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'pink',
            alignItems: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
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
                width: 117,
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
              <Icon name="chatbubble-outline" size={25} type="MaterialIcons" color={Color.Black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

//       <TouchableOpacity
//         onPress={() => {
//           console.log('clicked');
//         }}>
//         <PlaidLink
//           content
//           token={this.props.linkToken}
//           onSuccess={(data) => this._handleOnSuccess(data)}
//           onExit={(data) => this._handleExit()}>
//           <Icon name={'plus'} size={20} color={Color.ReadableGreyText} />
//         </PlaidLink>
//       </TouchableOpacity>

const mapStateToProps = function (state) {
  return {
    hasNewNotification: false,
    getLinkTokenPending: getStateForKey('state.plaid.link_token.pending', state),
    getLinkTokenError: getStateForKey('state.plaid.link_token.error', state),
    linkToken: getStateForKey('state.plaid.link_token.link_token', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleLinkSuccess: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Plaid.HandleLinkTokenError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Plaid.HandleLinkTokenSuccess,
        payload: data,
      });
    },
  };
};

module.exports = {
  BasicTopNavigationBar: connect(mapStateToProps, mapDispatchToProps)(BasicTopNavigationBar),
  MainTopNavigationBar: connect(mapStateToProps, mapDispatchToProps)(MainTopNavigationBar),
};
