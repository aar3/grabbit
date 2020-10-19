import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, Image, ScrollView} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color} from 'grabbit/src/const';

export default class V extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView style={styles.ScrollContainer}>
          <View style={styles.HeaderContainer}>
            <View style={styles.LogoContainer}>
              <Image
                source={require('../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
          </View>
          <View style={styles.container}>
            <BasicTextInput label="Company Name" />
            <BasicTextInput label="Contact Name" />
            <BasicTextInput label="Address 1" />
            <BasicTextInput label="Address 2" />

            <BasicTextInput label="City" />
            <BasicTextInput label="State" />
            <BasicTextInput label="Zip" />

            <BasicTextInput label="Email" />
            <BasicTextInput label="Password" />
            <BasicTextInput label="Social Media" />

            <BasicButton
              title="Sign Up"
              buttonStyle={{
                width: 300,
                height: 50,
                justifyContent: 'center',
                borderColor: Color.Pink2,
                borderWidth: 1,
                backgroundColor: Color.White,
                alignItems: 'center',
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              titleStyle={{
                color: Color.Pink2,
                fontWeight: 'bold',
              }}
              onPress={() => Actions.notifications()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    paddingBottom: 30,
  },
  HeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  LogoContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 50,
    height: 50,
    marginBottom: 20,
    marginTop: 20,
  },
  ScrollContainer: {
    flex: 1,
    // borderColor: 'blue',
    // borderWidth: 1,
    width: '100%',
    marginBottom: 100,
  },
});
