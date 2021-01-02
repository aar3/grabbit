import React from 'react';
import {Input, Button} from 'react-native-elements';
import {buttonStyle, buttonContainerStyle} from 'grabbit/src/Styles';

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
      autoCompleteType,
    } = this.props;
    return (
      <Input
        value={value}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoCompleteType={autoCompleteType}
        containerStyle={
          containerStyle || {
            width: 300,
          }
        }
        inputStyle={{
          fontSize: 13,
        }}
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
        buttonStyle={[buttonStyle, _buttonStyle]}
        containerStyle={buttonContainerStyle}
        titleStyle={titleStyle}
        title={title}
      />
    );
  }
}
