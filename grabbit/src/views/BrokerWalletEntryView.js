import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';

const data = {
  wallet_brand: {
    brand: {
      id: '1',
      name: 'Some Brand',
    },
    balance: 13.5194,
  },
  tiers: [
    {
      id: '1',
      value: '5',
      code: 'FOANB',
    },
    {
      id: '2',
      value: '20',
      code: 'ABCS',
    },
    {
      id: '3',
      value: '25',
      code: 'SIMP',
    },
    {
      id: '4',
      value: '50',
      code: 'CATCHMEALL',
    },
  ],
};

export default class V extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            // borderColor: 'blue',
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 10,
              width: '100%',
            }}></View>

          <FlatList
            style={{
              width: 400,
              // borderWidth: 1,
              // borderColor: 'pink',
            }}
            contentContainerStyle={{
              // borderWidth: 1,
              // borderColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={data.tiers}
            renderItem={({item, index}) => {
              if (data.wallet_brand.balance >= item.value) {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      borderColor: 'orange',
                      borderRadius: 10,
                      borderWidth: 1,
                      width: 350,
                      marginBottom: 20,
                      borderColor: Color.ForestGreen,
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        color: Color.ForestGreen,
                        fontWeight: 'bold',
                        fontSize: 32,
                      }}>
                      ${item.value} Off
                    </Text>
                    <Icon name="unlock" size={20} color={Color.ForestGreen} />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Color.ReadableGreyText,
                      }}>
                      Redeem Code: FOOFOO
                    </Text>
                  </View>
                );
              }
              return (
                <View
                  style={{
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    borderColor: 'orange',
                    width: 350,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginBottom: 20,
                    borderColor: Color.LightGrey,
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    style={{
                      color: Color.ReadableGreyText,
                      fontWeight: 'bold',
                      fontSize: 32,
                    }}>
                    ${item.value} Off
                  </Text>
                  <Icon name="lock" size={20} color={Color.ReadableGreyText} />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: Color.ReadableGreyText,
                    }}>
                    {/* No code if tier is not unlocked */}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
