import React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

import {FakeImage, Color} from 'grabbit/src/const';
import REDUX_ACTIONS from 'grabbit/src/actions';
import {GrowableTextAreaInput} from 'grabbit/src/components/text-input';
import {BasicButton, IconLeftButton} from 'grabbit/src/components/buttons';

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

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {updateCurrentMessageText, currentMessageText} = this.props;
    return (
      <KeyboardAvoidingView
        style={{
          paddingBottom: 100,
        }}>
        <FlatList
          style={{
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'red',
            height: '95%',
          }}
          data={conversation.messages}
          renderItem={({item, index}) => {
            const isActingUser = item.sender === '1';
            const styling = isActingUser
              ? styles.FlatListRow__Container__ToUser
              : styles.FlatListRow__Container__FromUser;

            return (
              <TouchableOpacity>
                <View style={styling}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: Color.DarkerLightGrey,
                    }}>
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: 'green',
            width: '100%',
            borderTopWidth: 1,
            borderTopColor: Color.LightGrey,
            minHeight: 40,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'blue',
              width: 300,
              minHeight: 40,
            }}>
            <TextInput
              multiline={true}
              value={currentMessageText}
              onChangeText={(text) => updateCurrentMessageText({text})}
              style={{
                borderWidth: 1,
                borderColor: Color.LightGrey,
                padding: 10,
                paddingTop: 10,
                fontSize: 12,
                fontFamily: 'Arial',
                width: '100%',
                minHeight: 40,
                borderRadius: 5,
                backgroundColor: Color.White,
              }}
            />
          </View>
          <Button title={'Send'} icon={<Icon name="send" size={15} color="white" />} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentMessageText: ({text}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_CURRENT_MESSAGE_TEXT,
        payload: text,
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {chat} = state;
  return {
    currentMessageText: chat.currentMessageText,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
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
});
