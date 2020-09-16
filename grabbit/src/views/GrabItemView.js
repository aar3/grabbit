import React from 'react';
import {StyleSheet, Text, Image, View, ScrollView} from 'react-native';

import {FakeImage, Color} from 'grabbit/src/const';

const data = {
  merchant: {
    id: '1',
    name: 'Finish Line Brands & Co.',
  },
  product: {
    id: '1',
    name: 'Air Jordan Title IV XXI Ltd.',
  },
};

export default class GrabItemView extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.GrabItem}>
        <View style={styles.GrabItem__ContentContainer}>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
            <View style={styles.GrabItem__ContentContainer__Sectional__Image}>
              <Image source={{uri: FakeImage}} style={{height: 75, width: 75}} />
            </View>
            <View style={styles.GrabItem__ContentContainer__Sectional__ProductInfo}>
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 14,
                  color: Color.Pink2,
                  fontWeight: 'bold',
                }}>
                {data.product.name}
              </Text>
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
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {'FROM'}
          </Text>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
            <View style={styles.GrabItem__ContentContainer__Sectional__Image}>
              <Image source={{uri: FakeImage}} style={{height: 75, width: 75}} />
            </View>
            <View style={styles.GrabItem__ContentContainer__Sectional__ProductInfo}>
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 14,
                  color: Color.Pink2,
                  fontWeight: 'bold',
                }}>
                {data.merchant.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                }}>
                {'Donec dignissim porta justo at commodo. Nam non porta purus. Maecenas interdum maximus convallis.'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginTop: 20,
              marginBottom: 20,
            }}>
            {'By consenting to represent this product you hereby agree to the following terms:'}
          </Text>
          <View style={styles.GrabItem__ContentContainer__Sectional}>
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
                {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus metus ante, convallis ac mattis a, cursus pulvinar lectus. Fusce eleifend nulla ut lorem dictum, a faucibus diam fringilla. Sed nec velit gravida, sagittis leo ac, dapibus magna. Curabitur suscipit congue nisi quis finibus. Suspendisse sed leo pellentesque, laoreet risus in, auctor ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce mattis ultrices arcu. '
                }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  GrabItem: {
    flex: 1,
    alignItems: 'center',
  },
  GrabItem__ContentContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  GrabItem__ContentContainer__Sectional: {
    borderWidth: 1,
    borderColor: 'blue',
    minHeight: 100,
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    // borderBottomColor: Color.LightGrey,
    // borderBottomWidth: 1,
  },
  GrabItem__ContentContainer__Sectional__Image: {
    height: 75,
    width: 75,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 10,
  },
  GrabItem__ContentContainer__Sectional__ProductInfo: {
    // borderWidth: 1,
    // borderColor: 'blue',
    height: 100,
    marginLeft: 20,
    width: 290,
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
