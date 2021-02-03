import React from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {Color} from 'grabbit/src/lib/Const';

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
          borderColor: Color.BorderLightGrey,
          borderWidth: 1,
          borderRadius: 10,
        }}
        containerStyle={
          containerStyle || {
            width: 300,
            paddingBottom: 5,
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
              // borderWidth: 1,
              // borderColor: 'red',
            },
          ]}></ImageBackground>
      </View>
    );
  }
}

export class EmptyFlatList extends React.Component {
  _renderLogoFooter() {
    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          marginTop: 20,
          height: 45,
          width: 200,
        }}>
        <Image
          source={require('./../../assets/imgs/Grabbit_Grey_Letters_222x1000.png')}
          style={{flex: 1, height: undefined, width: undefined}}
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // borderColor: 'red',
            // borderWidth: 1,
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.GreyBlue,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {this.props.title || 'Nothing here'}
          </Text>
          <Text
            style={{
              color: Color.GreyBlue,
              fontSize: 13,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {this.props.text || "Looks like we don't have anything for you here"}
          </Text>
          {this._renderLogoFooter()}
        </View>
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
            // borderWidth: 1,
            // borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text
          style={{
            color: Color.GreyBlue,
            // fontWeight: '500',
            fontSize: 18,
          }}>
          Ouch, there was a hiccup
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 10,
            textAlign: 'center',
            // fontWeight: 'bold',
            color: Color.GreyBlue,
          }}>
          {msg}
        </Text>
        <TouchableOpacity onPress={this.props.onTryAgain}>
          <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.Teal} />
        </TouchableOpacity>
        <Text style={{color: Color.GreyBlue, marginTop: 20}}>Try Again</Text>
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
