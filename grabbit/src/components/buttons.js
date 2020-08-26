import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export class BasicButton extends React.Component {
  _baseOnPress = () => {
    console.log('basic button pressed');
  };

  render() {
    const title = this.props.title || 'Basic Button';
    const onPress = this.props.onPress || this._baseOnPress;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.BasicButton}>
          <Text>{title}</Text>
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
