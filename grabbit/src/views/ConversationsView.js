import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';

import {Color, FakeImage} from 'grabbit/src/const';

const data = [
  {
    id: '1',
    sender: 'Ava Wiley Smith',
    recipient: 'Noel Villasenor',
    image_url: FakeImage,
    text:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
  },
  {
    id: '2',
    sender: 'Ava Wiley Smith',
    recipient: 'Noel Villasenor',
    image_url: FakeImage,
    text:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
  },
  {
    id: '3',
    sender: 'Ava Wiley Smith',
    recipient: 'Noel Villasenor',
    image_url: FakeImage,
    text:
      'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
  },
  {
    id: '4',
    sender: 'Ava Wiley Smith',
    recipient: 'Noel Villasenor',
    image_url: FakeImage,
    text: 'Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
  },
  {
    id: '5',
    sender: 'Ava Wiley Smith',
    recipient: 'Noel Villasenor',
    image_url: FakeImage,
    text:
      'Donec ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
  },
];

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    const shortMessage = data.text.length > 120 ? data.text.substr(0, 120) + '...' : data.text;
    return (
      <View style={styles.FlatListRow__Container}>
        <View style={styles.FlatListRow__Container__Image}>
          <Image source={{uri: data.image_url}} style={{height: 50, width: 50}} />
        </View>
        <View style={styles.FlatListRow__Container__Info}>
          <Text
            style={{
              fontSize: 11,
              color: Color.DarkerLightGrey,
            }}>
            {shortMessage}
          </Text>
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Icon name={'chevron-right'} size={20} color={Color.LightGrey} />
        </View>
      </View>
    );
  }
}

export default class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.ConversationsView}>
        <FlatList
          style={styles.ConversationsView__FlatList}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => Actions.chat()}>
                <FlatListRow data={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ConversationsView: {
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
    height: 75,
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
  },
  FlatListRow__Container__Image: {
    height: 50,
    width: 50,
    overflow: 'hidden',
    borderRadius: 100,
  },
  FlatListRow__Container__Info: {
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 5,
    width: '70%',
    marginLeft: 10,
  },
  ConversationsView__FlatList: {
    width: '100%',
  },
});
