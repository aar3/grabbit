import React from 'react';
import {View, Text, FlatList, Alert, ImageBackground, TouchableOpacity} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import PlaidLink from 'react-native-plaid-link-sdk';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {ToggleStyle} from 'grabbit/src/Styles';
import {Error} from 'grabbit/src/components/FlatList';
import {Color, BankLogos} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      endpoint: `/users/${this.props.user.id}/plaid/links/`,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  _onRefresh() {
    return this.props.getUserLinks(this.userLinksOptions);
  }

  _handleExit(data) {
    console.log('exit: ', data);
  }

  _renderAddButton() {
    if (this.props.linkToken) {
      return (
        <TouchableOpacity onPress={() => {}}>
          <PlaidLink
            content
            token={this.props.linkToken}
            onSuccess={(data) => this._handleOnSuccess(data)}
            onExit={(data) => this._handleExit()}>
            <Icon name="plus-circle" size={30} color={Color.BorderLightGrey} />
          </PlaidLink>
        </TouchableOpacity>
      );
    }

    return (
      <ImageBackground
        source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          height: 40,
          width: 40,
        }}></ImageBackground>
    );
  }

  async _handleOnSuccess(data) {
    const options = {
      method: 'POST',
      endpoint: `/users/${this.props.user.id}/plaid/link-token-success/`,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
      data,
    };

    return this.props.handleLinkSuccess(options);
  }

  async componentDidMount() {
    await this.props.getUserLinks(this.userLinksOptions);

    await this.props.getLinkToken({
      method: 'POST',
      endpoint: `/users/${this.props.user.id}/plaid/link-tokens/`,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
      data: {
        user_id: this.props.user.phone,
      },
    });
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
        <Error error={this.props.getUserLinkError} onTryAgain={() => this.props.getUserLinks(this.userLinksOptions)} />
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
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: Color.QueenBlue}}>
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
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'red',
            maxHeight: 80 * this.props.accounts.length,
          }}
          refreshing={this.props.getUserLinksPending}
          onRefresh={() => this._onRefresh()}
          data={this.props.accounts}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const bankMetadata = BankLogos[item.institution_name] || BankLogos.Default;
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Remove Account',
                    `Would you like to permanently delete your ${item.institution_name} account integration?`,
                    [
                      {
                        text: 'Yes',
                        onPress: () => {
                          Alert.alert(
                            'Confirm',
                            `Are your sure you\'d like to remove your ${item.institution_name} account integration?`,
                            [
                              {
                                text: 'Yes',
                                onPress: () => {
                                  return this.props.deleteAccount({
                                    endpoint: `/users/${this.props.user.id}/plaid/links/${item.id}/`,
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'X-Session-Token': this.props.user.current_session_token,
                                    },
                                  });
                                },
                              },
                              {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: false},
                          );
                        },
                      },
                      {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <View
                  style={{
                    backgroundColor: Color.White,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.BorderLightGrey,
                    padding: 10,
                    height: 70,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      // borderColor: 'green',
                      // borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <ImageBackground
                      source={{
                        uri: bankMetadata.img_url,
                        cache: 'force-cache',
                      }}
                      style={{
                        height: 40,
                        width: 40,
                        marginLeft: 20,
                        borderRadius: 100,
                        overflow: 'hidden',
                      }}></ImageBackground>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'red',
                        marginLeft: 20,
                        width: 250,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 10,
                          color: bankMetadata.color,
                        }}>
                        {item.institution_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          marginTop: 5,
                          color: bankMetadata.color,
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
                      }}>
                      <ToggleSwitch
                        isOn={Boolean(item.active)}
                        onColor={ToggleStyle.On}
                        offColor={ToggleStyle.Off}
                        label={null}
                        size="medium"
                        onToggle={() =>
                          this.props.updateLinkStatus({
                            endpoint: `/users/${this.props.user.id}/plaid/links/${item.id}/`,
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
              </TouchableOpacity>
            );
          }}
        />

        {this._renderAddButton()}
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const accountList = getStateForKey('state.accounts.plaid.links.list', state);
  return {
    user: getStateForKey('state.session.user', state),
    showPlaidModal: getStateForKey('state.accounts.plaid.show_modal', state),
    accounts: Object.values(accountList),
    getLinkTokenPending: getStateForKey('state.accounts.plaid.link_token.pending', state),
    getLinkTokenError: getStateForKey('state.accounts.plaid.link_token.error', state),
    linkToken: getStateForKey('state.accounts.plaid.link_token.link_token', state),
    getUserLinksPending: getStateForKey('state.accounts.plaid.links.pending', state),
    getUserLinkError: getStateForKey('state.accounts.plaid.links.error', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    getLinkToken: async function (options) {
      dispatch({
        type: ReduxActions.Accounts.GetLinkTokenPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Accounts.GetLinkTokenError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Accounts.GetLinkTokenSuccess,
        payload: data,
      });
    },

    // Remove the pending state so it doesn't clash with default FlatList loading image
    getUserLinksViaFlatList: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Accounts.GetUserLinksError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Accounts.GetUserLinksSuccess,
        payload: data,
      });
    },

    getUserLinks: async function (options) {
      dispatch({
        type: ReduxActions.Accounts.GetUserLinksPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Accounts.GetUserLinksError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Accounts.GetUserLinksSuccess,
        payload: data,
      });
    },

    updateLinkStatus: async function (options) {
      dispatch({
        type: ReduxActions.Accounts.UpdatePlaidAccountStatusPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        return dispatch({
          type: ReduxActions.Accounts.UpdatePlaidAccountStatusError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Accounts.UpdatePlaidAccountStatusSuccess,
        payload: data,
      });
    },

    handleLinkSuccess: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Accounts.HandleLinkTokenError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Accounts.HandleLinkTokenSuccess,
        payload: data,
      });
    },

    deleteAccount: async function (options) {
      dispatch({
        type: ReduxActions.Accounts.DeleteAccountPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Accounts.DeleteAccountError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Accounts.DeleteAccountSuccess,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
