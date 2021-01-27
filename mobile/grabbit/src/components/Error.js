import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Color} from 'grabbit/src/Const';
import Icon from 'react-native-vector-icons/Feather';

export class Error extends React.Component {
  render() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Color.GreyBlue,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Ouch, there was a hiccup
        </Text>
        <Text style={{fontSize: 14, marginTop: 10, fontWeight: 'bold', color: Color.BorderLightGrey}}>
          {this.props.error.details}
        </Text>
        <TouchableOpacity onPress={this.props.onTryAgain}>
          <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.BorderLightGrey} />
        </TouchableOpacity>
        <Text style={{color: Color.BorderLightGrey}}>Try Again</Text>
      </View>
    );
  }
}
