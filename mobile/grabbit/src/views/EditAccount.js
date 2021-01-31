import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {getStateForKey, httpStateUpdate} from 'grabbit/src/lib/Utils';
import {Button} from 'react-native-elements';
import {Color} from 'grabbit/src/lib/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateUserInfo() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/accounts/${this.props.user.id}/`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetDeals',
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
              value={this.props.user.phone}
              style={{
                width: '100%',
                color: Color.ReadableGreyText,
              }}
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
              value={this.props.user.email}
              style={{
                width: '100%',
                color: Color.ReadableGreyText,
              }}
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
              value={this.props.user.name}
              style={{
                width: '100%',
                color: Color.ReadableGreyText,
              }}
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
  };
};

export default connect(mapStateToProps, null)(V);
