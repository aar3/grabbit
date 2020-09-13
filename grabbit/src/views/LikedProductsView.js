import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {FakeImage, Color, Font} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '2',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '3',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '4',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '5',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '6',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '7',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
  {
    id: '8',
    image_url: FakeImage,
    link: 'https://google.com',
    merchant_id: '1',
  },
];

class FlatListRowImage extends React.Component {
  render() {
    const {imageURL} = this.props;
    return (
      <TouchableOpacity onPress={() => Actions.productInfo()}>
        <Image source={{uri: imageURL}} style={{height: 175, width: 175}} />
      </TouchableOpacity>
    );
  }
}

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRow}>
        <FlatListRowImage imageURL={data.image_url} />
        <FlatListRowImage imageURL={data.image_url} />
      </View>
    );
  }
}

export default class LikedProductsView extends React.Component {
  _renderItem({index, item}) {
    return <FlatListRow data={item} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={data} renderItem={this._renderItem} keyExtractor={(_item, index) => index.toString()} />
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
  FlatListRow: {
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 10,
    width: 400,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Color.LightGrey,
    justifyContent: 'space-around',
  },
});