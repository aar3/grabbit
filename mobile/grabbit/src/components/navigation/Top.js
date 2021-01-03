import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Color} from 'grabbit/src/Const';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

export class BasicTopNavigationBar extends React.Component {
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

export class AccountTopNavigationBar extends React.Component {
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
          <TouchableOpacity onPress={() => Actions.listRewards()}>
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

export class MainTopNavigationBar extends React.Component {
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
          <TouchableOpacity onPress={() => Actions.listRewards()}>
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
                source={require('./../../../assets/imgs/Grabbit_Gradient_Letters_111x500.png')}
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
