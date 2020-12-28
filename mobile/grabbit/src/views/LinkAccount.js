import React from 'react';
import {View, Text, FlatList, Image, ImageBackground} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
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
    const {user, dispatchUpdateState} = this.props;
    const options = {
      method: 'POST',
      endpoint: '/plaid/1/link-token-success/',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': user.current_session_token,
      },
      data,
    };

    const {error, data} = await httpRequest(options);
    // TODO: handle error case
    return dispatchUpdateState('state.plaid.accounts.current_publicktoken', data.public_key);
  }

  _handleExit(data) {
    console.log('exit: ', data);
  }

  async componentDidMount() {
    const {user, dispatchUpdateState} = this.props;
    const options = {
      method: 'POST',
      endpoint: '/plaid/link-tokens/',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': user.current_session_token,
      },
      data: {
        user_id: user.email,
      },
    };

    const {error, data} = await httpRequest(options);
    // TODO: if (error) { handle error }
    return dispatchUpdateState('state.plaid.accounts.current_linktoken', data.token);
  }

  _renderPlaidButton() {
    const {currentLinkToken} = this.props;
    if (!currentLinkToken) {
      return (
        <ImageBackground
          source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            height: 50,
            width: 50,
            marginBottom: 20,
          }}></ImageBackground>
      );
    }
    return (
      <PlaidLink
        token={currentLinkToken}
        onSuccess={(data) => this._handleOnSuccess(data)}
        onExit={(data) => Actions.listRewards()}>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: Color.Purple,
            borderColor: Color.White,
            height: 50,
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: Color.White,
              fontWeight: 'bold',
            }}>
            Add
          </Text>
        </View>
      </PlaidLink>
    );
  }

  render() {
    const {accounts, postNewAccountStatus} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            // marginTop: 20,
            width: '100%',
          }}
          data={accounts}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Color.BorderLightGrey,
                  padding: 10,
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    width: 250,
                    justifyContent: 'center',
                    marginLeft: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {item.institution}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 3,
                      color: Color.ReadableGreyText,
                      // fontStyle: 'italic',
                    }}>
                    Account No.: {item.account_number}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 3,
                      color: Color.ReadableGreyText,
                    }}>
                    Last Updated: {item.last_updated}
                  </Text>
                </View>
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    marginLeft: 30,
                  }}>
                  <ToggleSwitch
                    isOn={item.active}
                    onColor={ToggleStyle.On}
                    offColor={ToggleStyle.Off}
                    label={null}
                    size="small"
                    onToggle={() => {
                      postNewAccountStatus(`state.plaid.accounts.list.${item.id}`, item);
                    }}
                  />
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
  const accountList = getStateForKey('state.plaid.accounts.list', state);
  return {
    user: getStateForKey('state.user', state),
    showPlaidModal: getStateForKey('state.plaid.accounts.show_modal', state),
    accounts: Object.values(accountList),
    currentLinkToken: getStateForKey('state.plaid.accounts.current_linktoken', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    dispatchUpdateState: function (stateKey, payload) {
      return dispatch({
        type: ReduxActions.GENERIC_ACTION,
        payload,
        stateKey,
        operation: 'replace',
      });
    },
    postNewAccountStatus: function (stateKey, account) {
      const value = Object.assign({}, account, {
        active: false,
      });

      return dispatch({
        type: ReduxActions.GENERIC_ACTION,
        payload: value,
        stateKey,
        operation: 'replace',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
