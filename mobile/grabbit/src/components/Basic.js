import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Color} from 'grabbit/src/Const';

export class TextInput extends React.Component {
  render() {
    const {
      placeholder,
      label,
      autoCapitalize = 'none',
      labelStyle,
      onChangeText,
      autoCorrect,
      keyboardType,
      secureTextEntry,
      value,
      containerStyle,
      inputStyle,
      disabled,
      autoCompleteType,
    } = this.props;
    return (
      <Input
        disabled={disabled}
        value={value}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoCompleteType={autoCompleteType}
        inputContainerStyle={{
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 10,
        }}
        containerStyle={
          containerStyle || {
            width: 300,
            paddingBottom: 5,
            // borderWidth: 1,
            // borderColor: 'red',
            borderRadius: 10,
            height: 60,
          }
        }
        inputStyle={[
          {
            fontSize: 13,
            backgroundColor: Color.White,
            borderRadius: 10,
            padding: 10,
          },
          inputStyle,
        ]}
        label={label}
        labelStyle={labelStyle}
        placeholder={placeholder}
      />
    );
  }
}

export class GrabbitButton extends React.Component {
  render() {
    const {onPress, title, titleStyle, _buttonStyle, disabled} = this.props;
    return (
      <Button
        disabled={disabled}
        onPress={onPress}
        buttonStyle={[styles.buttonStyle, _buttonStyle]}
        containerStyle={styles.buttonContainerStyle}
        titleStyle={titleStyle}
        title={title}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    width: 300,
    borderRadius: 100,
  },
  buttonContainerStyle: {
    marginBottom: 10,
  },
});
