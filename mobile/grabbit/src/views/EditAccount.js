import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {getStateForKey} from 'grabbit/src/Utils';
import {GrabbitButton} from 'grabbit/src/components/Basic';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <GrabbitButton
            onPress={() => Actions.login()}
            _buttonStyle={{
              backgroundColor: Color.White,
              borderWidth: 1,
              borderColor: Color.GreyBlue,
            }}
            titleStyle={{
              color: Color.GreyBlue,
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
