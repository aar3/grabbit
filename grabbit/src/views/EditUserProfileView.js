import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {FakeImage, Color} from 'grabbit/src/const';
import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';

export default class EditUserProfile extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.EditUserProfile__ContentContainer}>
            <View style={styles.EditUserProfile__ContentContainer__Image}>
              <Image
                source={{uri: FakeImage}}
                style={{height: 150, width: 150}}
              />
            </View>
            <View style={styles.EditUserProfile__ContentContainer__Stats}>
              <View
                style={styles.EditUserProfile__ContentContainer__Stats__Left}>
                <Text style={styles.Stats__Text__Value}>{'252'}</Text>
                <Text style={styles.Stats__Text__Key}>{'LIKED'}</Text>
              </View>
              <View
                style={styles.EditUserProfile__ContentContainer__Stats__Center}>
                <Text style={styles.Stats__Text__Value}>{'57'}</Text>
                <Text style={styles.Stats__Text__Key}>{'MATCHED'}</Text>
              </View>
              <View
                style={styles.EditUserProfile__ContentContainer__Stats__Right}>
                <Text style={styles.Stats__Text__Value}>{'34'}</Text>
                <Text style={styles.Stats__Text__Key}>{'GRABBED'}</Text>
              </View>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View
                style={styles.EditUserProfile__ContentContainer__EditContainer}>
                <BasicTextInput label="Name" />
                <BasicTextInput label="Email" />
                <BasicTextInput label="Phone" />

                <BasicTextInput label="Address 1" />
                <BasicTextInput label="Address 2" />
                <BasicTextInput label="Shoe Size" />
                <BasicTextInput label="Shirt Size (US)" />
                <View
                  style={
                    styles.EditUserProfile__ContentContainer__EditContainer__Sizes
                  }>
                  <View
                    style={
                      styles.EditUserProfile__ContentContainer__EditContainer__Sizes__Left
                    }>
                    <Text style={styles.Stats__Text__Key}>{'Shoe Size'}</Text>
                    <Text style={styles.Stats__Text__Value}>{'12.5'}</Text>
                  </View>
                  <View
                    style={
                      styles.EditUserProfile__ContentContainer__EditContainer__Sizes__Center
                    }>
                    <Text style={styles.Stats__Text__Key}>{'Top Size'}</Text>
                    <Text style={styles.Stats__Text__Value}>{'L'}</Text>
                  </View>
                  <View
                    style={
                      styles.EditUserProfile__ContentContainer__EditContainer__Sizes__Right
                    }>
                    <Text style={styles.Stats__Text__Key}>{'Bottom Size'}</Text>
                    <Text style={styles.Stats__Text__Value}>{'33 M'}</Text>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer: {
    borderWidth: 1,
    borderColor: 'green',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer__Image: {
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 20,
    borderRadius: 100,
    height: 150,
    width: 150,
    overflow: 'hidden',
  },
  EditUserProfile__ContentContainer__Stats: {
    borderWidth: 1,
    borderColor: 'orange',
    height: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  EditUserProfile__ContentContainer__Stats__Left: {
    borderWidth: 1,
    borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer__Stats__Center: {
    borderWidth: 1,
    borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer__Stats__Right: {
    borderWidth: 1,
    borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer__EditContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Stats__Text__Key: {
    fontWeight: 'bold',
    color: Color.DarkerGrey,
  },
  Stats__Text__Value: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  EditUserProfile__ContentContainer__EditContainer__Sizes: {
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer__EditContainer__Sizes__Left: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EditUserProfile__ContentContainer__EditContainer__Sizes__Center: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EditUserProfile__ContentContainer__EditContainer__Sizes__Right: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
