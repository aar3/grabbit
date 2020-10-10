import React from 'react';
import {View, Modal, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color} from 'grabbit/src/const';

class M extends React.Component {
  constructor(props) {
    super(props);
  }

  show() {
    const {toggleInstagramLinkModal} = this.props;
    toggleInstagramLinkModal();
  }

  hide() {
    const {toggleInstagramLinkModal} = this.props;
    toggleInstagramLinkModal();
  }

  render() {
    const {
      toggleInstagramLinkModal,
      instagramEmailInput,
      instagramPasswordInput,
      updateInstagramLinkEmailInput,
      updateInstagramLinkPasswordInput,
      showInstagramAccountLinkModal,
    } = this.props;
    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={showInstagramAccountLinkModal}
        onRequestClose={() => {
          console.log('modal closed');
          toggleInstagramLinkModal();
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: 250,
            marginBottom: 315,
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => toggleInstagramLinkModal()}>
              <Icon name="x" size={15} color={Color.GreyText} />
            </TouchableOpacity>
            <View
              style={{
                // borderColor: 'red',
                // borderWidth: 1,
                marginTop: 20,
                width: '100%',
                height: '90%',
                alignItems: 'center',
              }}>
              <View style={styles.TextInput__Container}>
                <Text style={styles.TextInput__Label}>Email/Username</Text>
                <TextInput
                  autoCapitalize={'none'}
                  value={instagramEmailInput}
                  onChangeText={(text) => updateInstagramLinkEmailInput({text, key: 'instagramEmailInput'})}
                  style={styles.TextInput__Container__Input}
                />
              </View>
              <View style={styles.TextInput__Container}>
                <Text style={styles.TextInput__Label}>Password</Text>
                <TextInput
                  autoCapitalize={'none'}
                  value={instagramPasswordInput}
                  secureTextEntry
                  onChangeText={(text) => updateInstagramLinkPasswordInput({text, key: 'instagramPasswordInput'})}
                  style={styles.TextInput__Container__Input}
                />
              </View>
              <Button
                containerStyle={{
                    marginTop: 20,
                }}
                buttonStyle={{
                    width: 250,
                    borderRadius: 5,
                    backgroundColor: Color.Pink2,
                    height: 40,
                }}
                titleStyle={{
                    color: Color.White,
                    fontWeight: 'bold',
                    fontSize: 13,
                }}
                 title="Sign In with Instagram" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {accountLinking} = state;
  return {
    showInstagramAccountLinkModal: accountLinking.showInstagramAccountLinkModal,
    instagramEmailInput: accountLinking.instagramEmailInput,
    instagramPasswordInput: accountLinking.instagramPasswordInput,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleInstagramLinkModal: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_INSTAGRAM_LINK_ACCOUNT_MODAL,
      });
    },

    updateInstagramLinkEmailInput: ({text, key}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_INSTAGRAM_LINK_EMAIL_INPUT,
        key,
        payload: text,
      });
    },

    updateInstagramLinkPasswordInput: ({text, key}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_INSTAGRAM_LINK_PASSWORD_INPUT,
        key,
        payload: text,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);

const styles = StyleSheet.create({
  TextInput__Container: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: 250,
    marginBottom: 10,
  },
  TextInput__Container__Input: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    padding: 5,
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'Arial',
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Color.White,
  },
  TextInput__Label: {
    fontSize: 12,
    paddingBottom: 5,
    // fontFamily: Font.Default,
  },
});
