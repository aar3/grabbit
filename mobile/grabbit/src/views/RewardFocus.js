import React from 'react';
import {View, Text, Image} from 'react-native';
import {getStateForKey} from 'grabbit/src/Utils';
import {connect} from 'react-redux';
import {Color} from 'grabbit/src/Const';
import {GrabbitButton} from 'grabbit/src/components/Basic';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {reward} = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          //   justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: reward.merchant.primary_color,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              position: 'absolute',
              top: 100,
              left: 50,
              letterSpacing: 20,
              fontSize: 102,
              color: Color.White,
            }}>
            {reward.merchant.name.toUpperCase()}
          </Text>
          <Text
            style={{
              color: Color.White,
              position: 'absolute',
              left: 50,
              top: 220,
            }}>
            {reward.merchant.alternative_name}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.BorderLightGrey,
            height: 500,
            width: 300,
            position: 'absolute',
            top: 300,
            zIndex: 1,
            backgroundColor: Color.White,
            borderRadius: 20,
            padding: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              overflow: 'hidden',
              marginTop: 20,
              borderWidth: 1,
              borderColor: 'blue',
            }}>
            <Image source={{uri: reward.merchant.image_url}} style={{height: 100, width: 100}} />
          </View>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: Color.BorderLightGrey,
              width: 125,
              height: 125,
            }}>
            <Image source={{uri: reward.qr_code_url}} style={{height: 125, width: 125}} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'green',
              marginTop: 20,
              width: 225,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: Color.ReadableGreyText,
                textAlign: 'center',
                marginBottom: 20,
              }}>
              {reward.description}
            </Text>
            <GrabbitButton
              title={reward.code}
              _buttonStyle={{
                width: 225,
                backgroundColor: reward.merchant.primary_color,
              }}
            />
            <Text
              style={{
                color: Color.ReadableGreyText,
                fontSize: 10,
              }}>{`Expires on ${reward.expiry}`}</Text>
          </View>
        </View>
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: Color.White,
          }}></View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    reward: getStateForKey('state.rewards.focused', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(V);