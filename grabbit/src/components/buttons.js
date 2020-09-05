import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

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

const styles = StyleSheet.create({
  BasicButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
});
