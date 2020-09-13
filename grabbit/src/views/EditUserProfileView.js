import React from 'react';
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView} from 'react-native';

import {FakeImage, Color, Font} from 'grabbit/src/const';
import {BasicTextInput} from 'grabbit/src/components/TextInput';
import {BasicButton} from 'grabbit/src/components/buttons';

export default class EditUserProfile extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.EditUserProfile__ContentContainer}>
            <View style={styles.EditUserProfile__ContentContainer__Image}>
              <Image source={{uri: FakeImage}} style={{height: 150, width: 150}} />
            </View>
            <View style={styles.EditUserProfile__ContentContainer__Stats}>
              <View style={styles.EditUserProfile__ContentContainer__Stats__All}>
                <Text style={styles.Stats__Text__Value}>{'252'}</Text>
                <Text style={styles.Stats__Text__Key}>{'LIKED'}</Text>
              </View>
              <View style={styles.EditUserProfile__ContentContainer__Stats__All}>
                <Text style={styles.Stats__Text__Value}>{'57'}</Text>
                <Text style={styles.Stats__Text__Key}>{'MATCHED'}</Text>
              </View>
              <View style={styles.EditUserProfile__ContentContainer__Stats__All}>
                <Text style={styles.Stats__Text__Value}>{'34'}</Text>
                <Text style={styles.Stats__Text__Key}>{'GRABBED'}</Text>
              </View>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View style={styles.EditUserProfile__ContentContainer__EditContainer}>
                <BasicTextInput label="Name" />
                <BasicTextInput label="Email" />
                <BasicTextInput label="Phone" />

                <BasicTextInput label="Address 1" />
                <BasicTextInput label="Address 2" />
                <BasicTextInput label="Shoe Size" />
                <BasicTextInput label="Shirt Size (US)" />
                <BasicButton
                  title="Save"
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
                  onPress={() => {}}
                />
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
    // borderWidth: 1,
    // borderColor: 'green',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  EditUserProfile__ContentContainer__Image: {
    // borderWidth: 1,
    // borderColor: 'blue',
    marginBottom: 20,
    borderRadius: 100,
    height: 150,
    width: 150,
    overflow: 'hidden',
    marginTop: 20,
  },
  EditUserProfile__ContentContainer__Stats: {
    // borderWidth: 1,
    // borderColor: 'orange',
    height: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  EditUserProfile__ContentContainer__Stats__All: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditUserProfile__ContentContainer__EditContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
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
});
