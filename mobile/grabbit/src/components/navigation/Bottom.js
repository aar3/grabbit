import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Color, TabIconSize} from 'grabbit/src/lib/Const';

const tabStyle = {
  borderWidth: 1,
  borderColor: 'blue',
};

export class BottomTabNavigation extends React.Component {
  render() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'red',
          height: 100,
        }}>
        <View style={tabStyle}>
          <Icon name={'menu'} size={TabIconSize} color={focused ? Color.GreyBlue : Color.ReadableGreyText} />
        </View>
        <View style={tabStyle}>
          <Icon name={'toggle-right'} size={TabIconSize} color={focused ? Color.GreyBlue : Color.ReadableGreyText} />
        </View>
        <View style={tabStyle}>
          <Icon name={'message-circle'} size={TabIconSize} color={focused ? Color.GreyBlue : Color.ReadableGreyText} />
        </View>
        <View style={tabStyle}>
          <Icon name={'user'} size={TabIconSize} color={focused ? Color.GreyBlue : Color.ReadableGreyText} />
        </View>
      </View>
    );
  }
}
