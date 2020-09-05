import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

import {FakeImage, Color, Font} from 'grabbit/src/const';

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
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
    },
  },
  {
    id: '2',
    image_url: FakeImage,
    product: {
      name: 'Lorem Ipsum – Generator, Origins and Meaning',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
    },
  },
  {
    id: '3',
    image_url: FakeImage,
    product: {
      name: 'Lorem Ipsum – Generator, Origins and Meaning',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
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
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
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
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
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
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
    },
  },
  {
    id: '7',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
    },
  },
  {
    id: '8',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      id: '1',
      matched_on: 'Matched 4 days ago',
    },
  },
];

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRow__Container}>
        <View style={styles.FlatListRow__Container__Image}>
          <Image source={{uri: data.image_url}} style={{height: 75, width: 75}} />
        </View>
        <View style={styles.FlatListRow__Container__Info}>
          <Text style={{marginBottom: 5}}>{data.product.name}</Text>
          <Text style={{color: Color.GreyText, marginBottom: 5, fontSize: 11}}>{data.shipping.shipped_on}</Text>
          <Text style={{color: Color.Pink2}}>{data.match.matched_on}</Text>
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
          style={styles.BrokerMatchesView__FlatList}
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
    // borderWidth: 1,
    // borderColor: 'blue',
    flexDirection: 'row',
    padding: 10,
    // width: '90%',
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
  },
  FlatListRow__Container__Image: {
    height: 75,
    width: 75,
    borderRadius: 100,
    overflow: 'hidden',
  },
  FlatListRow__Container__Info: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '70%',
    padding: 10,
  },
  BrokerMatchesView__FlatList: {
    width: '100%',
  },
});
