import React from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
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

export class LoadingView extends React.Component {
  _renderTitle() {
    if (this.props.title) {
      return (
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: Color.BorderLightGrey,
          }}>
          {this.props.title}
        </Text>
      );
    }
    return null;
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this._renderTitle()}
        <ImageBackground
          source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
          style={[
            this.props.style,
            {
              borderWidth: 1,
              borderColor: 'red',
            },
          ]}></ImageBackground>
      </View>
    );
  }
}

export class ErrorView extends React.Component {
  render() {
    const msg = this.props.overrideMsg || this.props.error.details;
    return (
      <View
        style={[
          this.props.style,
          {
            borderWidth: 1,
            borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text
          style={{
            color: Color.ReadableGreyText,
            fontWeight: '500',
            fontSize: 18,
          }}>
          Ouch, there was a hiccup
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 10,
            fontWeight: 'bold',
            color: Color.ReadableGreyText,
          }}>
          {msg}
        </Text>
        <TouchableOpacity onPress={this.props.onTryAgain}>
          <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.ReadableGreyText} />
        </TouchableOpacity>
        <Text style={{color: Color.ReadableGreyText}}>Try Again</Text>
      </View>
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
