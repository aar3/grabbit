import React from 'react';
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView} from 'react-native';

import {FakeImage, Color, Font} from 'grabbit/src/const';
import {BasicTextInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';

export default class V extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.MerchantEditProfileView}>
          <View style={styles.MerchantEditProfileView__ContentContainer}>
            <View style={styles.MerchantEditProfileView__ContentContainer__Image}>
              <Image source={{uri: FakeImage}} style={{height: 150, width: 150}} />
            </View>
            <View style={styles.MerchantEditProfileView__ContentContainer__Stats}>
              <View style={styles.MerchantEditProfileView__ContentContainer__Stats__Left}>
                <Text style={styles.Stats__Text__Value}>{'252'}</Text>
                <Text style={styles.Stats__Text__Key}>{'LIKES'}</Text>
              </View>
              <View style={styles.MerchantEditProfileView__ContentContainer__Stats__Center}>
                <Text style={styles.Stats__Text__Value}>{'57'}</Text>
                <Text style={styles.Stats__Text__Key}>{'MATCHED'}</Text>
              </View>
              <View style={styles.MerchantEditProfileView__ContentContainer__Stats__Right}>
                <Text style={styles.Stats__Text__Value}>{'34'}</Text>
                <Text style={styles.Stats__Text__Key}>{'SHIPPED'}</Text>
              </View>
            </View>
            <View style={styles.MerchantEditProfileView__ContentContainer__Stats}>
              <View style={styles.MerchantEditProfileView__ContentContainer__Stats__Left}>
                <Text style={styles.Stats__Text__Value}>{'18'}</Text>
                <Text style={styles.Stats__Text__Key}>{'PRODUCT'}</Text>
              </View>
              <View style={styles.MerchantEditProfileView__ContentContainer__Stats__Center}>
                <Text style={styles.Stats__Text__Value}>{'13, 817'}</Text>
                <Text style={styles.Stats__Text__Key}>{'VIEWS'}</Text>
              </View>
              <View style={styles.MerchantEditProfileView__ContentContainer__Stats__Right}>
                <Text style={styles.Stats__Text__Value}>{'247'}</Text>
                <Text style={styles.Stats__Text__Key}>{'GRABBED'}</Text>
              </View>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View style={styles.MerchantEditProfileView__ContentContainer__EditContainer}>
                <BasicTextInput label="Company Name" />
                <BasicTextInput label="Email" />
                <BasicTextInput label="Phone" />

                <BasicTextInput label="Address 1" />
                <BasicTextInput label="Address 2" />
                <BasicButton
                  title="Save"
                  buttonStyle={{
                    width: 300,
                    height: 50,
                    justifyContent: 'center',
                    backgroundColor: Color.White,
                    borderColor: Color.Pink2,
                    borderWidth: 1,
                    alignItems: 'center',
                    borderRadius: 40,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  titleStyle={{
                    color: Color.Pink2,
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
  MerchantEditProfileView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  MerchantEditProfileView__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MerchantEditProfileView__ContentContainer__Image: {
    // borderWidth: 1,
    // borderColor: 'blue',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    height: 150,
    width: 150,
    overflow: 'hidden',
  },
  MerchantEditProfileView__ContentContainer__Stats: {
    // borderWidth: 1,
    // borderColor: 'orange',
    height: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  MerchantEditProfileView__ContentContainer__Stats__Left: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MerchantEditProfileView__ContentContainer__Stats__Center: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MerchantEditProfileView__ContentContainer__Stats__Right: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MerchantEditProfileView__ContentContainer__EditContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Stats__Text__Key: {
    fontWeight: 'bold',
    color: Color.DarkerGrey,
    fontFamily: Font.Default,
  },
  Stats__Text__Value: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: Font.Default,
  },
});
