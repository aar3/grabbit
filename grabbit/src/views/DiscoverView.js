import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'redux';
import {Actions} from 'react-native-router-flux';

import {FakeImage} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '2',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '3',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '4',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '5',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '6',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '7',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
  {
    id: '8',
    image_url: FakeImage,
    link: 'https://google.com',
    name: 'Air Jordan 12 IV',
    merchant: {
      id: '1',
      name: 'Finish Line Brands LLC'
    }
  },
];

class FlatListRowImage extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRowImage__Container}>
        <TouchableOpacity onPress={() => Actions.productInfo()}>
          <Image source={{uri: data.image_url}} style={{height: 175, width: 175}} />
        </TouchableOpacity>
        <View style={styles.FlatListRowImage__Container__Info}>
          <Text style={{ fontSize: 11, marginBottom: 5 }}>{data.name}</Text>
          <Text style={{ fontSize: 11 }}>{data.merchant.name}</Text>
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
          <FlatList
            data={data}
            renderItem={this._renderItem}
            keyExtractor={(_item, index) => index.toString()}
          />
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
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  DiscoverView__ContentContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatListRowImage__Container: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  FlatListRowImage__Container__Info: {
    borderWidth: 1,
    borderColor: 'red',
    height: 50,
    padding: 5,
  }
});
