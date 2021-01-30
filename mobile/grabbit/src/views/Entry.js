import React from 'react';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Color} from 'grabbit/src/lib/Const';
import {GrabbitButton} from 'grabbit/src/components/Basic';

export default class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: Color.White,
        }}>
        <View
          style={{
            height: 69,
            position: 'absolute',
            top: 400,
            width: 300,
            // borderColor: 'blue',
            // borderWidth: 1,
          }}>
          <Image
            source={require('./../../assets/imgs/Grabbit_Gradient_Letters_2042x479.png')}
            style={{flex: 1, height: undefined, width: undefined}}
          />
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            position: 'absolute',
            top: 700,
            width: 300,
          }}>
          <GrabbitButton
            onPress={() => Actions.login()}
            _buttonStyle={{
              backgroundColor: Color.White,
              borderWidth: 1,
              borderColor: Color.Teal,
            }}
            titleStyle={{
              color: Color.Teal,
              fontWeight: 'bold',
            }}
            title="Login"
          />

          <GrabbitButton
            onPress={() => Actions.signup()}
            _buttonStyle={{
              backgroundColor: Color.OceanBlue,
            }}
            titleStyle={{
              color: Color.White,
              fontWeight: 'bold',
            }}
            title="Sign Up"
          />
        </View>
      </View>
    );
  }
}
