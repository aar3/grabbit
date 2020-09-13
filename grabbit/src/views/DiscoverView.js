import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {connect} from 'redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {FakeImage, Color} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    likeCount: 312,
    views: 1281,
    grabs: 13,
    interest: 58,
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    merchant: {
      id: '1',
      name: 'Lorem Ipsum – Generator, Origins and Meaning',
    },
  },
  {
    id: '2',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    likeCount: 312,
    likeCount: 312,
    views: 1281,
    grabs: 13,
    interest: 58,
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    merchant: {
      id: '1',
      name: 'Quisque neque diam, semper',
    },
  },
  {
    id: '3',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    likeCount: 312,
    views: 1281,
    grabs: 13,
    interest: 58,
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    merchant: {
      id: '1',
      name: 'Quisque neque diam, semper',
    },
  },
  {
    id: '4',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    likeCount: 312,
    views: 1281,
    grabs: 13,
    interest: 58,
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC',
    },
  },
  {
    id: '5',
    image_url: FakeImage,
    link: 'https://google.com',
    likeCount: 312,
    views: 1281,
    grabs: 13,
    interest: 58,
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC',
    },
  },
  {
    id: '6',
    image_url: FakeImage,
    likeCount: 312,
    views: 1281,
    interest: 58,
    grabs: 13,
    link: 'https://google.com',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    merchant: {
      id: '1',
      name: 'Lorem Ipsum – Generator, Origins and Meaning',
    },
  },
  {
    id: '7',
    image_url: FakeImage,
    likeCount: 312,
    views: 1281,
    grabs: 13,
    interest: 58,
    link: 'https://google.com',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    merchant: {
      id: '1',
      name: 'Quisque neque diam, semper',
    },
  },
  {
    id: '8',
    image_url: FakeImage,
    likeCount: 312,
    views: 1281,
    interest: 58,
    grabs: 13,
    link: 'https://google.com',
    description:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    merchant: {
      id: '1',
      name: 'Lorem Ipsum – Generator, Origins and Meaning',
    },
  },
];

class FlatListRowImage extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRowImage__Container}>
        <TouchableOpacity onPress={() => Actions.productInfo()}>
          <Image source={{uri: data.image_url}} style={{height: 350, width: 350}} />
        </TouchableOpacity>
        <View style={styles.FlatListRowImage__Container__Info}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 16, marginBottom: 10}}>{data.name}</Text>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                style={styles.FlatListRowImage__Container__Info__Icon}
                name="heart"
                size={20}
                color={Color.GreyText}
              />
              <Text style={styles.FlatListRowImage__Container__Info__Number}>{data.likeCount}</Text>
              <Icon
                style={styles.FlatListRowImage__Container__Info__Icon}
                name="shopping-bag"
                size={20}
                color={Color.GreyText}
              />
              <Text style={styles.FlatListRowImage__Container__Info__Number}>{data.grabs}</Text>
              <Icon style={styles.FlatListRowImage__Container__Info__Icon} name="zap" size={20} color={Color.Pink2} />
              <Text style={styles.FlatListRowImage__Container__Info__Number}>{data.interest}</Text>
              <Icon style={styles.FlatListRowImage__Container__Info__Icon} name="tv" size={20} color={Color.GreyText} />
              <Text style={styles.FlatListRowImage__Container__Info__Number}>{data.views}</Text>
            </View>
          </View>
          <Text style={{fontSize: 13, fontWeight: 'bold', marginBottom: 10}}>{data.merchant.name}</Text>
          <Text style={{fontSize: 12, marginBottom: 5, color: Color.DarkerGrey}}>{data.description}</Text>
        </View>
      </View>
    );
  }
}

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRow}>
        <FlatListRowImage data={data} />
      </View>
    );
  }
}

export default class DiscoverView extends React.Component {
  _renderItem({index, item}) {
    return <FlatListRow data={item} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.DiscoverView__ContentContainer}>
          <FlatList data={data} renderItem={this._renderItem} keyExtractor={(_item, index) => index.toString()} />
        </View>
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
    justifyContent: 'space-around',
  },
  DiscoverView__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatListRowImage__Container: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    borderRadius: 10,
    overflow: 'hidden',
  },
  FlatListRowImage__Container__Info: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 350,
    padding: 10,
  },
  FlatListRowImage__Container__Info__Icon: {
    marginLeft: 10,
  },
  FlatListRowImage__Container__Info__Number: {
    marginLeft: 5,
  },
});
