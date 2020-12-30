import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {Color} from 'grabbit/src/Const';

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
          borderBottomColor: Color.LightGrey,
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
      <ImageBackground
        source={require('./../../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}
        style={{
          // borderWidth: 1,
          // borderColor: 'orange',
          flexDirection: 'row',
          height: 90,
          padding: 10,
          backgroundColor: Color.Purple,
          borderBottomWidth: 1,
          borderBottomColor: Color.LightGrey,
          width: '103%',
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
            // borderColor: 'yellow',
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
          <Image
            source={require('./../../../assets/imgs/Grabbit_White_G_300x300.png')}
            style={{height: 30, width: 30}}
          />
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            top: 40,
            borderRadius: 50,
            height: 40,
            width: 40,
            right: 20,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
        </View>
      </ImageBackground>
    );
  }
}
