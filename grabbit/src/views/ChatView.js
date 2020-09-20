import React from 'react';
import {StyleSheet, Text, View, FlatList, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {FakeImage, Color} from 'grabbit/src/const';

const conversation = {
  subject: 'This is the subject',
  participants: [
    {
      id: '1',
      name: 'Ava Wiley Smith',
      image_url: FakeImage,
    },
    {
      id: '2',
      name: 'Noel Simpson',
      image_url: FakeImage,
    },
  ],
  messages: [
    {
      id: '1',
      sender: '1',
      recipient: '2',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '2',
      sender: '2',
      recipient: '1',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '3',
      sender: '2',
      recipient: '1',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '4',
      sender: '2',
      recipient: '1',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '5',
      sender: '1',
      recipient: '2',
      text: 'Donec dignissim ligula non.',
    },
    {
      id: '6',
      sender: '1',
      recipient: '2',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '6',
      sender: '2',
      recipient: '1',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '8',
      sender: '1',
      recipient: '2',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien. Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien. Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '9',
      sender: '2',
      recipient: '1',
      text: 'Donec dignissim ligula non dolor euismod tincidunt.',
    },
    {
      id: '10',
      sender: '2',
      recipient: '1',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
    {
      id: '11',
      sender: '1',
      recipient: '2',
      text:
        'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
    },
  ],
};

const currentUserId = '1';

class FlatListRow extends React.Component {
  render() {
    const {data, isActingUser} = this.props;
    const stylingSuffix = isActingUser ? 'FromUser' : 'ToUser';

    return (
      <View style={styles[`FlatListRow__Container__${stylingSuffix}`]}>
        <Text
          style={{
            fontSize: 11,
            color: Color.DarkerLightGrey,
          }}>
          {data.text}
        </Text>
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
      <ScrollView contentContainerStyle={styles.ChatView}>
        <View>
          <FlatList
            style={styles.ChatView__FlatList}
            data={conversation.messages}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <FlatListRow data={item} isActingUser={item.sender === currentUserId} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ConversationsView: {
    flexGrow: 1,
  },
  FlatListRow__Container__FromUser: {
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    // width: '90%',
    position: 'relative',
    left: 100,
    width: 300,
    height: 75,
    marginTop: 20,
  },
  FlatListRow__Container__ToUser: {
    borderWidth: 1,
    borderColor: 'green',
    flexDirection: 'row',
    padding: 10,
    width: 300,
    borderRadius: 10,
    // width: '90%',
    marginTop: 20,
    marginLeft: 20,
    height: 75,
  },
  ChatView__FlatList: {
    width: '100%',
  },
});
