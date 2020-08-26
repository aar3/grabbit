import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

import {FakeImage} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
  },
  {
    id: '2',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
  },
  {
    id: '3',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
  },
  {
    id: '4',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
  },
  {
    id: '5',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
  },
  {
    id: '6',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
  },
];

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRow__Container}>
        <Image
          source={{uri: data.image_url}}
          style={{height: 150, width: 150}}
        />
        <View style={styles.FlatListRow__Container__Info}>
          <Text>{data.product.name}</Text>
          <Text>{''}</Text>
          <Text>{data.shipping.shipped_on}</Text>
          <Text>{''}</Text>
          <Text>{data.shipping.expires}</Text>
        </View>
      </View>
    );
  }
}

export default class BrokerMatchesView extends React.Component {
  _renderItem({item, index}) {
    return <FlatListRow data={item} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListRow__Container: {
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    padding: 10,
    // width: '90%',
  },
  FlatListRow__Container__Info: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
});
