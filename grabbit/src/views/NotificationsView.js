import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';

import {FakeImage, Color} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '2',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '3',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '4',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '5',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '6',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '7',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '8',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '9',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
  {
    id: '10',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
  },
];

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.FlatListRow__Container}>
        <View style={styles.FlatListRow__Container__Image}>
          <Image
            source={{uri: data.user.image_url}}
            style={{height: 50, width: 50}}
          />
        </View>
        <View style={styles.FlatListRow__Container__Info}>
          <Text style={{fontSize: 12}}>{data.text}</Text>
        </View>
      </View>
    );
  }
}

export default class NotificationsView extends React.Component {
  _renderItem({index, item}) {
    return <FlatListRow data={item} />;
  }

  render() {
    const msg = 'You have ' + data.length + ' new notifications';
    return (
      <View style={styles.container}>
        <Text
          style={{marginTop: 10, marginBottom: 10, color: Color.DarkerGrey}}>
          {msg}
        </Text>
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
    width: 400,
    padding: 10,
    marginBottom: 10,
  },
  FlatListRow__Container__Info: {
    borderWidth: 1,
    borderColor: 'red',
    width: 285,
    marginLeft: 10,
  },
  FlatListRow__Container__Image: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 50,
    overflow: 'hidden',
  },
});
