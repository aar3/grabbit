import React from 'react';
import {StyleSheet, Text, View, Alert, KeyboardAvoidingView} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';
import {Color} from 'grabbit/src/const';

export default class BrokerFurtherDetails extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.container}>
          <Text
            style={{
              color: Color.Pink2,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 30,
              marginTop: 5,
            }}>
            {'Just a few more details...'}
          </Text>
          <BasicTextInput label="Address Line 1" />
          <BasicTextInput label="Address Line 2" />
          <BasicTextInput label="City" />
          <BasicTextInput label="State" />
          <BasicTextInput label="Zip" />

          <BasicButton
            title="Start Grabbing"
            buttonStyle={{
              width: 300,
              height: 50,
              justifyContent: 'center',
              backgroundColor: Color.Pink2,
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 10,
              marginBottom: 10,
            }}
            titleStyle={{
              color: Color.White,
              fontWeight: 'bold',
            }}
            onPress={() => Actions.discover()}
          />

          <BasicButton
            title="Skip For Now"
            buttonStyle={{
              width: 300,
              height: 50,
              justifyContent: 'center',
              borderColor: Color.Pink2,
              borderWidth: 1,
              backgroundColor: Color.White,
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 10,
              marginBottom: 10,
            }}
            titleStyle={{
              color: Color.Pink2,
              fontWeight: 'bold',
            }}
            onPress={() => {
              Alert.alert(
                'FYI',
                'You will not be able to match merchants and get products without giving us this info.',
                [
                  {
                    text: 'I understand',
                    onPress: () => Actions.discover(),
                  },
                  {
                    text: "I'll do this now",
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
