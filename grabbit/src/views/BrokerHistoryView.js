import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {Color, FakeImage} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    type: 'Offer',
    product: {
      name: 'Some product name 123',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Pending',
  },
  {
    id: '2',
    type: 'Offer',
    product: {
      name: 'Function components cannot be given refs. Attempts to access',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Grabbed',
  },
  {
    id: '3',
    type: 'Offer',
    product: {
      name: 'Function components cannot be given refs. Attempts to access',
      merchant: {
        name: 'Function components cannot be given refs. Attempts to access',
      },
    },
    status: 'Declined',
  },
  {
    id: '4',
    type: 'Grab',
    product: {
      name: 'Some product name 123',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Grabbed',
  },
  {
    id: '5',
    type: 'Shipment',
    product: {
      name: 'Some product name 123',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Shipped',
    expected_delivery: '12/12/2020',
  },
  {
    id: '5',
    type: 'Shipment',
    product: {
      name: 'Function components cannot be given refs. Attempts to access',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Shipped',
    expected_delivery: '12/12/2020',
  },
  {
    id: '3',
    type: 'Offer',
    product: {
      name: 'Some product name 123',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Declined',
  },
  {
    id: '3',
    type: 'Offer',
    product: {
      name: 'Some product name 123',
      merchant: {
        name: 'Hello Fresh Brands, LLC',
      },
    },
    status: 'Declined',
  },
];

export default class V extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
          }}>
          <FlatList
            style={
              {
                //   borderWidth: 1,
                //   borderColor: 'orange',
              }
            }
            data={data}
            renderItem={({item, index}) => {
              let iconName;
              let iconColor = Color.LightGrey;

              if (item.type === 'Grab') {
                [iconName, iconColor] = ['tag', Color.ForestGreen];
              }

              if (item.type === 'Offer') {
                [iconName, iconColor] =
                  item.status === 'Accepted' ? ['check', Color.ForestGreen] : ['x', Color.CherryRed];
              }

              if (item.type === 'Shipment') {
                iconName = 'truck';
              }

              return (
                <TouchableOpacity onPress={() => {}}>
                  <View
                    style={{
                      borderBottomColor: Color.LightGrey,
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                      padding: 10,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'red',
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderRadius: 100,
                          width: 40,
                          overflow: 'hidden',
                          height: 40,
                        }}>
                        <Image source={{uri: FakeImage}} style={{height: 40, width: 40}} />
                      </View>
                      <View
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'green',
                          marginLeft: 20,
                          width: 250,
                          padding: 5,
                        }}>
                        <Text>{item.product.name}</Text>
                        <Text
                          style={{
                            marginTop: 5,
                            color: Color.ReadableGreyText,
                            fontSize: 11,
                          }}>
                          {item.product.merchant.name}
                        </Text>

                        {item.expected_delivery ? (
                          <Text
                            style={{
                              fontSize: 11,
                              marginTop: 5,
                              color: Color.ReadableGreyText,
                            }}>
                            Expected Delivery: {item.expected_delivery}
                          </Text>
                        ) : null}
                      </View>
                      <View
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'blue',
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {iconName ? <Icon name={iconName} size={20} color={iconColor} /> : null}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
