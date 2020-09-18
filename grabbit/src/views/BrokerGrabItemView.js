import React from 'react';
import {StyleSheet, Text, Image, View, Alert, ScrollView} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {FakeImage, Color} from 'grabbit/src/const';
import {BasicButton} from 'grabbit/src/components/buttons';

const data = {
  merchant: {
    id: '1',
    name: 'Finish Line Brands & Co.',
  },
  product: {
    id: '1',
    name: 'Air Jordan Title IV XXI Ltd.',
    terms:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus metus ante, convallis ac mattis a, cursus pulvinar lectus. Fusce eleifend nulla ut lorem dictum, a faucibus diam fringilla. Sed nec velit gravida, sagittis leo ac, dapibus magna. Curabitur suscipit congue nisi quis finibus. Suspendisse sed leo pellentesque, laoreet risus in, auctor ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce mattis ultrices arcu. ',
    expiry: '12/11/2020',
    delivery_estimate: '9/19/2020',
  },
};

export default class BrokerGrabItemView extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.GrabItem}>
        <View style={styles.GrabItem__ContentContainer}>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 18,
                color: Color.Pink2,
                fontWeight: 'bold',
              }}>
              {data.product.name}
            </Text>
            <View style={styles.GrabItem__ContentContainer__Sectional__ProductInfo}>
              <View style={styles.GrabItem__ContentContainer__Sectional__Image}>
                <Image source={{uri: FakeImage}} style={{height: 75, width: 75}} />
              </View>
              <View style={styles.GrabItem__ContentContainer__Sectional__Text}>
                <Text
                  style={{
                    fontSize: 11,
                  }}>
                  {
                    'Donec dignissim porta justo at commodo. Nam non porta purus. Maecenas interdum maximus convallis. Integer a orci faucibus, tincidunt ligula ac, consectetur neque.'
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 18,
                color: Color.Pink2,
                fontWeight: 'bold',
              }}>
              {data.merchant.name}
            </Text>
            <View style={styles.GrabItem__ContentContainer__Sectional__ProductInfo}>
              <View style={styles.GrabItem__ContentContainer__Sectional__Image}>
                <Image source={{uri: FakeImage}} style={{height: 75, width: 75}} />
              </View>
              <View style={styles.GrabItem__ContentContainer__Sectional__Text}>
                <Text
                  style={{
                    fontSize: 11,
                  }}>
                  {
                    'Donec dignissim porta justo at commodo. Nam non porta purus. Maecenas interdum maximus convallis. Integer a orci faucibus, tincidunt ligula ac, consectetur neque.'
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
            <Text
              style={{
                fontSize: 18,
                color: Color.Pink2,
                fontWeight: 'bold',
              }}>
              {'Shipping'}
            </Text>
            <View style={styles.GrabItem__ContentContainer__Sectional__ProductInfo}>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'truck'} size={30} color={Color.DarkerLightGrey} />
              </View>
              <View style={styles.GrabItem__ContentContainer__Sectional__Text}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 7,
                    color: Color.DarkerLightGrey,
                  }}>
                  {'Expires On'}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 7,
                  }}>
                  {data.product.expiry}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.DarkerLightGrey,
                    marginBottom: 7,
                  }}>
                  {'Expected Delivery'}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 7,
                  }}>
                  {data.product.delivery_estimate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.GrabItem__ContentContainer__Sectional_Terms}>
            <View style={styles.GrabItem__ContentContainer__Sectional__Terms}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: Color.White,
                }}>
                {'Terms'}
              </Text>

              <Text
                style={{
                  color: Color.White,
                }}>
                {data.product.terms}
              </Text>
            </View>
          </View>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 18,
                color: Color.Pink2,
                fontWeight: 'bold',
              }}>
              {'Additional Section'}
            </Text>
            <View style={styles.GrabItem__ContentContainer__Sectional__ProductInfo}>
              <View style={styles.GrabItem__ContentContainer__Sectional__Image}>
                <Image source={{uri: FakeImage}} style={{height: 75, width: 75}} />
              </View>
              <View style={styles.GrabItem__ContentContainer__Sectional__Text}>
                <Text
                  style={{
                    fontSize: 11,
                  }}>
                  {
                    'Donec dignissim porta justo at commodo. Nam non porta purus. Maecenas interdum maximus convallis. Integer a orci faucibus, tincidunt ligula ac, consectetur neque.'
                  }
                </Text>
              </View>
            </View>
          </View>
          <BasicButton
            title="Grabbit"
            buttonStyle={{
              width: 300,
              height: 50,
              justifyContent: 'center',
              borderColor: Color.Pink2,
              borderWidth: 1,
              backgroundColor: Color.White,
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 30,
            }}
            titleStyle={{
              color: Color.Pink2,
              fontWeight: 'bold',
            }}
            onPress={() => {
              Alert.alert(
                'Are you sure you want to Grabbit?',
                "You've read the terms? You can't undo this action",
                [
                  {
                    text: 'Grabbit',
                    onPress: () => Actions.grabbed(),
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            }}
          />

          <BasicButton
            title="Not Now"
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
            }}
            titleStyle={{
              color: Color.Pink2,
              fontWeight: 'bold',
            }}
            onPress={() => Actions.matches()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  GrabItem: {
    flexGrow: 1,
    alignItems: 'center',
  },
  GrabItem__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  GrabItem__ContentContainer__Sectional: {
    // borderWidth: 1,
    // borderColor: 'green',
    minWidth: '95%',
    marginTop: 20,
    justifyContent: 'center',
    // borderBottomColor: Color.LightGrey,
    // borderBottomWidth: 1,
    borderTopColor: Color.LightGrey,
    borderTopWidth: 1,
    padding: 10,
  },
  GrabItem__ContentContainer__Sectional_Terms: {
    // borderWidth: 1,
    // borderColor: 'green',
    minWidth: '95%',
    justifyContent: 'center',
    // borderBottomColor: Color.LightGrey,
    // borderBottomWidth: 1,
    // borderTopColor: Color.LightGrey,
    // borderTopWidth: 1,
    padding: 10,
  },
  GrabItem__ContentContainer__Sectional__Image: {
    height: 75,
    width: 75,
    borderRadius: 100,
    overflow: 'hidden',
  },
  GrabItem__ContentContainer__Sectional__Text: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 250,
    padding: 10,
    marginLeft: 20,
  },
  GrabItem__ContentContainer__Sectional__ProductInfo: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: 350,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  GrabItem__ContentContainer__Sectional__Terms: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    padding: 20,
    backgroundColor: Color.Pink2,
  },
});
