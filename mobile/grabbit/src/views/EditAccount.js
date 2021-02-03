import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {getStateForKey, httpStateUpdate} from 'grabbit/src/lib/Utils';
import {Button} from 'react-native-elements';
import {Color} from 'grabbit/src/lib/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    return this.props.dispatch({
      type: ReduxActions.Session.SetEditingUser,
    });
  }

  updateUserInfo() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/accounts/${this.props.tmpUser.id}/`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.tmpUser.current_session_token,
        },
        data: this.props.tmpUser,
      },
      stateKeyPrefix: 'EditAccountInfo',
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          //   justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 20,
            // borderWidth: 1,
            // borderColor: 'red',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 60,
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'blue',
              padding: 5,
              marginBottom: 10,
              // borderBottomWidth: 1,
              // borderBottomColor: Color.BorderLightGrey,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Phone
            </Text>
            <TextInput
              value={this.props.tmpUser.phone}
              style={{
                width: '100%',
                color: Color.ReadableGreyText,
              }}
              onChangeText={(text) =>
                this.props.dispatch({
                  type: ReduxActions.Session.UpdateTmpEditAccountValue,
                  key: 'phone',
                  payload: text,
                })
              }
            />
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'blue',
              padding: 5,
              marginBottom: 10,
              // borderBottomWidth: 1,
              // borderBottomColor: Color.BorderLightGrey,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Email
            </Text>
            <TextInput
              value={this.props.tmpUser.email}
              style={{
                width: '100%',
                color: Color.ReadableGreyText,
              }}
              onChangeText={(text) =>
                this.props.dispatch({
                  type: ReduxActions.Session.UpdateTmpEditAccountValue,
                  key: 'email',
                  payload: text,
                })
              }
            />
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'blue',
              padding: 5,
              marginBottom: 10,
              // borderBottomWidth: 1,
              // borderBottomColor: Color.BorderLightGrey,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Name
            </Text>
            <TextInput
              value={this.props.tmpUser.name}
              style={{
                width: '100%',
                color: Color.ReadableGreyText,
              }}
              onChangeText={(text) =>
                this.props.dispatch({
                  type: ReduxActions.Session.UpdateTmpEditAccountValue,
                  key: 'name',
                  payload: text,
                })
              }
            />
          </View>
          <Button
            onPress={() => this.updateUserInfo()}
            containerStyle={{
              width: 300,
            }}
            buttonStyle={{
              backgroundColor: Color.White,
              borderRadius: 30,
              borderWidth: 1,
              height: 50,
              borderColor: Color.OceanBlue,
            }}
            titleStyle={{
              color: Color.OceanBlue,
              fontWeight: 'bold',
            }}
            title="Save"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    user: getStateForKey('state.session.user', state),
    tmpUser: getStateForKey('state.session.edit_account.tmp_user', state),
  };
};

export default connect(mapStateToProps, null)(V);
