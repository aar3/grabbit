import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';

export class BasicButton extends React.Component {
  _baseOnPress = () => {
    console.log('basic button pressed');
  };

  render() {
    const {buttonStyle, titleStyle, title, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress || this._baseOnPress}>
        <View style={buttonStyle || styles.BasicButton}>
          <Text style={titleStyle}>{title || 'Basic Button'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export class IconLeftButton extends React.Component {
  _baseOnPress = () => {
    console.log('icon left button pressed');
  };

  render() {
    const {buttonStyle, titleStyle, title, iconColor, onPress, iconName} = this.props;
    return (
      <TouchableOpacity onPress={onPress || this._baseOnPress}>
        <View style={buttonStyle || styles.IconLeftButton}>
          <Icon
            style={{marginLeft: 20}}
            name={iconName || 'align-justify'}
            size={20}
            color={iconColor || Color.Pink2}
          />
          <Text style={titleStyle}>{title || 'Basic Button'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  BasicButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  IconLeftButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
});
