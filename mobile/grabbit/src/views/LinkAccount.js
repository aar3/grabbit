import React from 'react';
import {View, Text, FlatList, Image, ImageBackground, TouchableOpacity} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import PlaidLink from 'react-native-plaid-link-sdk';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {GrabbitButton} from 'grabbit/src/components/Basic';
import {ToggleStyle} from 'grabbit/src/Styles';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  _handleExit(data) {
    console.log('exit: ', data);
  }

  get linkTokenOptions() {
    return {
      method: 'POST',
      endpoint: '/plaid/link-tokens/',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
      data: {
        user_id: this.props.user.phone,
      },
    };
  }

  get userLinksOptions() {
    return {
      method: 'GET',
      endpoint: `/plaid/${this.props.user.id}/links/`,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  async componentDidMount() {
    await this.props.getUserLinks(this.userLinksOptions);

    await this.props.getLinkToken({
      method: 'POST',
      endpoint: '/plaid/link-tokens/',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
      data: {
        user_id: this.props.user.phone,
      },
    });
  }

  _renderAccountMetadata(accounts = []) {
    return accounts.map((item, index) => {
      return (
        <View
          key={index.toString()}
          style={{
            // borderWidth: 1,
            // borderColor: Color.ReadableGreyText,
            padding: 10,
            borderRadius: 10,
            // marginBottom: 10,
          }}>
          <Text
            style={{
              color: Color.ReadableGreyText,
              // marginBottom: 5,
            }}>
            Account Name: {item.name}
          </Text>
          <Text
            style={{
              color: Color.ReadableGreyText,
              marginBottom: 5,
            }}>
            Account ID: XXXX{item.id.substring(0, 10)}
          </Text>
        </View>
      );
    });
  }

  _renderPlaidButton() {
    if (this.props.getLinkTokenError) {
      return (
        <TouchableOpacity onPress={() => this.props.getLinkToken(this.linkTokenOptions)}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              // position: 'absolute',
              backgroundColor: Color.ErrorRed,
              bottom: 10,
              width: 300,
              borderRadius: 50,
              height: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: -1,
              },
              shadowOpacity: 0.5,
              shadowRadius: 5.84,
              elevation: 5,
            }}>
            <Text
              style={{
                color: Color.White,
              }}>
              Couldn't get your account info.
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (!this.props.linkToken) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            // justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 50,
              width: 50,
              marginBottom: 20,
            }}></ImageBackground>
        </View>
      );
    }
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: Color.Purple,
          bottom: 10,
          width: 300,
          borderRadius: 50,
          height: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: -1,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5.84,
          elevation: 5,
        }}>
        <PlaidLink
          content
          token={this.props.linkToken}
          onSuccess={(data) => this._handleOnSuccess(data)}
          onExit={(data) => this._handleExit()}>
          <Text
            style={{
              color: Color.White,
              fontWeight: 'bold',
            }}>
            Add Account
          </Text>
        </PlaidLink>
      </View>
    );
  }

  _onRefresh() {
    return this.props.getUserLinksViaFlatList(this.userLinksOptions);
  }

  render() {
    if (this.props.getUserLinksPending) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginBottom: 40,
              fontWeight: 'bold',
              fontSize: 22,
              color: Color.BorderLightGrey,
            }}>
            Loading Accounts
          </Text>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 50,
              width: 50,
              marginBottom: 20,
            }}></ImageBackground>
        </View>
      );
    }

    if (this.props.getUserLinkError) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.Purple,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Ouch, there was a hiccup
          </Text>
          <Text style={{fontSize: 14, marginTop: 10, fontWeight: 'bold', color: Color.BorderLightGrey}}>
            {this.props.getUserLinkError.details}
          </Text>
          <TouchableOpacity onPress={() => this.props.getUserLinks(this.userLinksOptions)}>
            <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.BorderLightGrey} />
          </TouchableOpacity>
          <Text style={{color: Color.BorderLightGrey}}>Try Again</Text>
        </View>
      );
    }

    if (this.props.accounts.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // borderColor: 'red',
              // borderWidth: 1,
              width: 300,
            }}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: Color.Purple}}>
              You haven't linked any accounts, yet
            </Text>
            <Text
              style={{
                color: Color.ReadableGreyText,
                fontSize: 12,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Tap below to add your first account
            </Text>
            <Text
              style={{
                color: Color.BorderLightGrey,
                fontSize: 12,
                textAlign: 'center',
                marginTop: 10,
              }}>
              You unfortunately won't be able to use Grabbit until you link at least 1 account
            </Text>
          </View>
          {this._renderPlaidButton()}
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'red',
            maxHeight: 240 * this.props.accounts.length,
          }}
          refreshing={this.props.getUserLinksPending}
          onRefresh={() => this._onRefresh()}
          data={this.props.accounts}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: Color.White,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.BorderLightGrey,
                  padding: 10,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.BorderLightGrey,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginLeft: 65,
                    marginBottom: 10,
                  }}>
                  {item.institution_name}
                </Text>
                <View
                  style={{
                    // borderColor: 'green',
                    // borderWidth: 1,
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <ImageBackground
                    source={{
                      uri: 'https://image.shutterstock.com/image-vector/bank-icon-logo-vector-260nw-399995245.jpg',
                    }}
                    style={{
                      height: 50,
                      width: 50,
                      borderWidth: 1,
                      borderColor: Color.BorderLightGrey,
                      borderRadius: 100,
                      overflow: 'hidden',
                    }}></ImageBackground>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      justifyContent: 'center',
                      width: 250,
                      alignItems: 'center',
                    }}>
                    {this._renderAccountMetadata(item.accounts)}
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        marginTop: 10,
                        marginBottom: 5,
                        color: Color.ReadableGreyText,
                      }}>
                      Last Updated: {(item.updated_at || item.created_at).substring(0, 10)}
                    </Text>
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <ToggleSwitch
                      isOn={Boolean(item.active)}
                      onColor={ToggleStyle.On}
                      offColor={ToggleStyle.Off}
                      label={null}
                      size="large"
                      onToggle={() =>
                        this.props.updateLinkStatus({
                          endpoint: `/plaid/${this.props.user.id}/links/${item.id}/`,
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            'X-Session-Token': this.props.user.current_session_token,
                          },
                          data: Object.assign({}, item, {
                            active: item.active === 1 ? 0 : 1,
                          }),
                        })
                      }
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
        {this._renderPlaidButton()}
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const accountList = getStateForKey('state.plaid.links.list', state);
  return {
    user: getStateForKey('state.session.user', state),
    showPlaidModal: getStateForKey('state.plaid.show_modal', state),
    accounts: Object.values(accountList),
    getLinkTokenPending: getStateForKey('state.plaid.link_token.pending', state),
    getLinkTokenError: getStateForKey('state.plaid.link_token.error', state),
    linkToken: getStateForKey('state.plaid.link_token.link_token', state),
    getUserLinksPending: getStateForKey('state.plaid.links.pending', state),
    getUserLinkError: getStateForKey('state.plaid.links.error', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    getLinkToken: async function (options) {
      dispatch({
        type: ReduxActions.Plaid.GetLinkTokenPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Plaid.GetLinkTokenError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Plaid.GetLinkTokenSuccess,
        payload: data,
      });
    },

    // Remove the pending state so it doesn't clash with default FlatList loading image
    getUserLinksViaFlatList: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Plaid.GetUserLinksError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Plaid.GetUserLinksSuccess,
        payload: data,
      });
    },

    getUserLinks: async function (options) {
      dispatch({
        type: ReduxActions.Plaid.GetUserLinksPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Plaid.GetUserLinksError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Plaid.GetUserLinksSuccess,
        payload: data,
      });
    },

    updateLinkStatus: async function (options) {
      dispatch({
        type: ReduxActions.Plaid.UpdateLinkAccountStatusPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        return dispatch({
          type: ReduxActions.Plaid.UpdateLinkAccountStatusError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Plaid.UpdateLinkAccountStatusSuccess,
        payload: data,
      });
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(V);
