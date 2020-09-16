import React from 'react';
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';

import {FakeImage, Color, Font} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna nulla, malesuada at felis et, placerat vehicula felis.',
    user: {
      id: '1',
      image_url: FakeImage,
    },
    event: {
      type: 'offer',
      type_id: '1',
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
      'Sed in felis sed nibh auctor mattis id eu sem. Mauris eu consequat tortor. Ut ligula nisi, posuere interdum facilisis id, consequat non justo. Donec eu urna eu libero bibendum elementum. Curabitur aliquam lorem ipsum, a sollicitudin sem tincidunt eget. Praesent id magna ut ante tincidunt vehicula sed non metus. Suspendisse tempus urna vel hendrerit rhoncus.',
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
      'Sed in felis sed nibh auctor mattis id eu sem. Mauris eu consequat tortor. Ut ligula nisi, posuere interdum facilisis id, consequat non justo. Donec eu urna eu libero bibendum elementum. Curabitur aliquam lorem ipsum, a sollicitudin sem tincidunt eget. Praesent id magna ut ante tincidunt vehicula sed non metus. Suspendisse tempus urna vel hendrerit rhoncus.',
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
          <Image source={{uri: data.user.image_url}} style={{height: 50, width: 50}} />
        </View>
        <View style={styles.FlatListRow__Container__Info}>
          <Text
            style={{
              fontSize: 12,
              color: Color.DarkerLightGrey,
            }}>
            {data.text}
          </Text>
        </View>
      </View>
    );
  }
}

export default class NotificationsView extends React.Component {
  _renderItem({index, item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('notification pressed');
        }}>
        <FlatListRow data={item} />
      </TouchableOpacity>
    );
  }

  render() {
    const msg = `You have ${data.length} new notifications`;
    return (
      <View style={styles.container}>
        {/* <View style={styles.NotificationCount}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: Color.DarkerGrey,
              fontFamily: Font.Default,
            }}>
            {msg}
          </Text>
        </View> */}
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
  NotificationCount: {
    // borderWidth: 1,
    // borderColor: 'red',
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: Color.White,
  },
  FlatListRow__Container: {
    borderBottomWidth: 1,
    borderBottomColor: Color.LightGrey,
    flexDirection: 'row',
    width: 400,
    padding: 10,
    marginBottom: 10,
  },
  FlatListRow__Container__Info: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 285,
    marginLeft: 10,
  },
  FlatListRow__Container__Image: {
    // borderWidth: 1,
    // borderColor: 'green',
    borderRadius: 50,
    height: 50,
    width: 50,
    overflow: 'hidden',
  },
});
