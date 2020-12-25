import React from 'react';
import {Input, Button} from 'react-native-elements';
import {buttonStyle, buttonContainerStyle} from 'grabbit/src/styles';

export class TextInput extends React.Component {
  render() {
    const {placeholder, label, labelStyle} = this.props;
    return (
      <Input
        containerStyle={{
          width: 300,
        }}
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

// NOTE: this should be the exact same as TextInput just with secureTextEntry
export class PasswordInput extends React.Component {
  render() {
    const {placeholder, label, labelStyle} = this.props;
    return (
      <Input
        secureTextEntry={true}
        containerStyle={{
          width: 300,
        }}
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
    const {onPress, title, titleStyle, _buttonStyle} = this.props;
    return (
      <Button
        onPress={onPress}
        buttonStyle={[buttonStyle, _buttonStyle]}
        containerStyle={buttonContainerStyle}
        titleStyle={titleStyle}
        title={title}
      />
    );
  }
}
