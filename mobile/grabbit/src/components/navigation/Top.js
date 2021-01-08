import React from 'react';
import {View, Image, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Color} from 'grabbit/src/Const';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
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

class AccountTopNavigationBar extends React.Component {
  render() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'orange',
          height: 90,
          backgroundColor: '#f0f0f0',
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLightGrey,
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            flexDirection: 'row',
            marginTop: 50,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity onPress={() => Actions.listDeal()}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                // height: 40,
                // width: 40,
                // overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('./../../../assets/imgs/Grabbit_Gradient_Letters_111x500.png')}
                style={{height: 27, width: 122}}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 40,
              width: 40,
              right: 20,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.settings()}>
              <Icon name={'more-horizontal'} size={20} color={Color.Black} />
            </TouchableOpacity>
          </View>
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
          height: 90,
          backgroundColor: '#f0f0f0',
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLightGrey,
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            flexDirection: 'row',
            marginTop: 50,
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              height: 40,
              width: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {null}
          </View>
          <TouchableOpacity onPress={() => Actions.listDeal()}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'yellow',
                // height: 40,
                // width: 40,
                borderRadius: 50,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('./../../../assets/imgs/Grabbit_Black_Letters_111x500.png')}
                style={{height: 27, width: 122}}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              borderRadius: 50,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {null}
          </View>
        </View>
      </View>
    );
  }
}

class LinkAccountTopNavigationBar extends React.Component {
  _handleExit(data) {
    console.log('exit: ', data);
  }

  async _handleOnSuccess(data) {
    const options = {
      method: 'POST',
      endpoint: `/plaid/${this.props.user.id}/link-token-success/`,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
      data,
    };

    return this.props.handleLinkSuccess(options);
  }

  _renderButton() {
    if (this.props.getLinkTokenPending) {
      return (
        <ImageBackground
          source={require('./../../../assets/imgs/Loading-Transparent-Cropped.gif')}
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            height: 30,
            width: 30,
          }}></ImageBackground>
      );
    }

    if (this.props.getLinkTokenError) {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log('clicked');
          }}>
          <Icon name={'x'} size={20} color={Color.ErrorRed} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => {
          console.log('clicked');
        }}>
        <PlaidLink
          content
          token={this.props.linkToken}
          onSuccess={(data) => this._handleOnSuccess(data)}
          onExit={(data) => this._handleExit()}>
          <Icon name={'plus'} size={20} color={Color.ReadableGreyText} />
        </PlaidLink>
      </TouchableOpacity>
    );
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
              color: Color.ReadableGreyText,
            }}>
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            height: 40,
            width: 40,
            right: 20,
            position: 'absolute',
            top: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {this._renderButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
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
  AccountTopNavigationBar: connect(mapStateToProps, mapDispatchToProps)(AccountTopNavigationBar),
  LinkAccountTopNavigationBar: connect(mapStateToProps, mapDispatchToProps)(LinkAccountTopNavigationBar),
};
