import React from 'react';
import {View, Text, StyleSheet, Platform, TextInput, Image, KeyboardAvoidingView} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {Color, Font} from 'grabbit/src/const';

export default class InterestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
      pending: false,
    };
  }

  async submitInterest() {
    if (!this._validateEmail(this.state.email)) {
      this.setState({error: {details: 'Invalid email'}});
    }

    // submit input
  }

  _validateEmail(email) {
    if (!this.state.email || !this.state.email.includes('@') || !this.state.email.includes('.com')) {
      return false;
    }
    return true;
  }

  _renderErrorHeader() {
    if (!this.state.error) {
      return null;
    }

    return (
      <View style={styles.Interest__ContentContainer__Error}>
        <Text style={{color: Color.DarkOrange, fontFamily: Font.Default}}>{this.state.error.details}</Text>
      </View>
    );
  }

  render() {
    const error = this._renderErrorHeader();
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.Interest}>
        <View style={styles.Interest__ContentContainer}>
          <View style={styles.Interest__ContentContainer__Img}>
            <Image source={require('../../assets/imgs/white-letters-logo.png')} />
          </View>
          <View style={styles.Interest__ContentContainer__Blurb}>
            <Text style={{color: Color.White, fontFamily: Font.Default}}>{'Grab free stuff. Show it off.'}</Text>
          </View>
          {error}
          {/* <View style={styles.Interest__ContentContainer__Label}>
            <Text style={{color: Color.White, fontFamily: Font.Default}}>
              {'Email'}
            </Text>
          </View> */}
          <TextInput
            style={styles.Interest__ContentContainer__EmailInput}
            value={this.state.email}
            placeholder="Enter email"
            autoCapitalize="none"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.Interest__ContentContainer__Button}>
              <Text
                style={{
                  color: Color.White,
                  fontFamily: Font.Default,
                }}>
                {'Sign Up'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  Interest: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.DarkPurple,
  },
  Interest__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '80%',
  },
  Interest__ContentContainer__Blurb: {
    // borderColor: 'green',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  Interest__ContentContainer__Label: {
    // borderColor: 'green',
    // borderWidth: 1,
    marginBottom: 5,
  },
  Interest__ContentContainer__Error: {
    // borderWidth: 1,
    // borderColor: 'green',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Interest__ContentContainer__Img: {
    // borderWidth: 1,
    // borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Interest__ContentContainer__EmailInput: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    height: 40,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Color.White,
    marginBottom: 25,
  },
  Interest__ContentContainer__Button: {
    borderRadius: 25,
    backgroundColor: Color.Pink2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
