import React from 'react';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Color} from 'grabbit/src/Const';
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
        }}>
        <View
          style={{
            borderWidth: 1,
            height: 65,
            position: 'absolute',
            top: 400,
            width: 300,
            borderColor: 'blue',
          }}>
          <Image
            source={require('./../../assets/imgs/Grabbit_Gradient_Letters_222x1000.png')}
            style={{flex: 1, height: undefined, width: undefined}}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'red',
            position: 'absolute',
            top: 700,
            width: 300,
          }}>
          <GrabbitButton
            onPress={() => Actions.login()}
            _buttonStyle={{
              backgroundColor: Color.White,
              borderWidth: 1,
              borderColor: Color.Purple,
            }}
            titleStyle={{
              color: Color.Purple,
              fontWeight: 'bold',
            }}
            title="Login"
          />

          <GrabbitButton
            onPress={() => Actions.signup()}
            _buttonStyle={{
              backgroundColor: Color.Purple,
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
