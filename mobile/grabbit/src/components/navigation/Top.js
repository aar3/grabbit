import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Color} from 'grabbit/src/Const';
import {Actions} from 'react-native-router-flux';

export class BasicTopNavigationBar extends React.Component {
  render() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'orange',
          flexDirection: 'row',
          height: 90,
          padding: 10,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLighGrey,
          width: '100%',
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            top: 40,
            height: 40,
            width: 40,
            position: 'absolute',
            left: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'pink',
            top: 40,
            height: 40,
            width: 40,
            borderRadius: 50,
            left: 180,
            position: 'absolute',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            top: 40,
            borderRadius: 50,
            height: 40,
            width: 40,
            left: 330,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
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
