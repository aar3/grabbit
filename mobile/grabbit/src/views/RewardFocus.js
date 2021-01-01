import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {getStateForKey} from 'grabbit/src/Utils';
import {connect} from 'react-redux';
import {Color, FakeQRCodeURL} from 'grabbit/src/Const';
import {GrabbitButton} from 'grabbit/src/components/Basic';

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
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: this.props.reward.data.code.campaign.merchant.primary_color,
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={{
              fontWeight: 'bold',
              position: 'absolute',
              top: 25,
              left: 50,
              letterSpacing: 20,
              fontSize: 180,
              color: Color.White,
            }}>
            {this.props.reward.data.code.campaign.merchant.name.toUpperCase()}
          </Text>
          <Text
            style={{
              color: Color.White,
              position: 'absolute',
              left: 55,
              top: 220,
            }}>
            {this.props.reward.data.code.campaign.merchant.alternative_name}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.BorderLightGrey,
            height: 450,
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
              width: 3,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 12.84,
            elevation: 10,
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
            <Image
              source={{uri: this.props.reward.data.code.campaign.merchant.image_url}}
              style={{height: 100, width: 100}}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: Color.BorderLightGrey,
              width: 127,
              height: 127,
            }}>
            <Image
              source={{uri: this.props.reward.data.qr_code_url || FakeQRCodeURL}}
              style={{height: 125, width: 125}}
            />
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
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
              {this.props.reward.data.code.description}
            </Text>
            <GrabbitButton
              title={this.props.reward.data.code.code}
              titleStyle={{
                fontWeight: 'bold',
              }}
              _buttonStyle={{
                width: 225,
                backgroundColor: this.props.reward.data.code.campaign.merchant.primary_color,
              }}
            />
            <Text
              style={{
                color: Color.ReadableGreyText,
                fontSize: 10,
              }}>{`Expires on ${this.props.reward.data.expiry.substr(0, 10)}`}</Text>
          </View>
        </View>
        <View
          style={{
            height: '50%',
            width: '100%',
            // backgroundColor: Color.White,
          }}>
          <ImageBackground
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 100,
              width: '100%',
              position: 'absolute',
              bottom: 100,
            }}
            source={require('./../../assets/imgs/BarCode_Background.png')}></ImageBackground>
        </View>
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
