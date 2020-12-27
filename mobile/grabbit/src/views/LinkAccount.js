import React from 'react';
import {View, Text, FlatList} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
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

  async _getLinkToken() {
    // const {user} = this.props;
    // const options = {
    //   method: 'POST',
    //   url: 'http://localhost:8000/api/v1/plaid/link-tokens/',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Session-Token': user.current_session_token,
    //   },
    //   data: {
    //     user_id: user.email,
    //   },
    // };
    // const response = await httpRequest(options);
    // this.setState({linkToken: response.data.token, didMount: true});
  }

  _handleOnSuccess(data) {}

  _handleExit(data) {
    console.log('exit: ', data);
  }

  // _renderPlaidModal() {
  //   // await this._getLinkToken();
  //   const {showPlaidModal} = this.props;
  //   console.log('>> ', showPlaidModal)
  //   if (showPlaidModal) {
  //     return (
  //       <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <PlaidLink
  //         token={'123'}
  //         onSuccess={(data) => this._handleOnSuccess(data)}
  //         onExit={(data) => this._handleExit(data)}>
  //         <Text>Add Account</Text>
  //       </PlaidLink>
  //     </View>
  //     );
  //   }
  // }

  render() {
    const {accounts, postNewAccountStatus, updateStateProperty} = this.props;
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
        <PlaidLink
          token={'123'}
          onSuccess={(data) => this._handleOnSuccess(data)}
          onExit={(data) => this._handleExit(data)}>
          <GrabbitButton
            // onPress={() => updateStateProperty('state.plaid.accounts.show_modal', true)}
            _buttonStyle={{
              backgroundColor: Color.Purple,
            }}
            titleStyle={{
              color: Color.White,
              fontWeight: 'bold',
            }}
            title="Add"
          />
        </PlaidLink>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  console.log(state);
  const accountList = getStateForKey('state.plaid.accounts.list', state);
  return {
    user: getStateForKey('state.user', state),
    showPlaidModal: getStateForKey('state.plaid.accounts.show_modal', state),
    accounts: Object.values(accountList),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
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
    updateStateProperty: function (stateKey, value) {
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
