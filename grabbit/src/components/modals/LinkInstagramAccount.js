import React from 'react';
import {View, Modal, StyleSheet, TextInput, TouchableOpacity, Text, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color} from 'grabbit/src/const';
import styles from 'grabbit/src/styles/global';

class M extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {childRef} = this.props;
    childRef(this);
  }

  componentWillUnmount() {
    const {childRef} = this.props;
    childRef(undefined);
  }

  show() {
    const {toggleInstagramLinkModal} = this.props;
    toggleInstagramLinkModal();
  }

  hide() {
    const {toggleInstagramLinkModal} = this.props;
    toggleInstagramLinkModal();
  }

  renderLoadingView() {
    const {instagramLinkPending} = this.props;
    if (!instagramLinkPending) {
      return null;
    }
    return (
      <View
        style={{
          height: 30,
          width: 30,
          marginTop: 10,
          // borderWidth: 1,
          // borderColor: 'red',
        }}>
        <Image
          source={require('../../../assets/imgs/Loading-Transparent-Cropped.gif')}
          style={{flex: 1, height: undefined, width: undefined}}
        />
      </View>
    );
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
          toggleInstagramLinkModal();
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: 250,
            marginBottom: 300,
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
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginBottom: 20,
                }}>
                Link Your Instagram
              </Text>
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
                onPress={() => console.log('Sign in with Instagram')}
                buttonStyle={{
                  width: 250,
                  borderRadius: 10,
                  backgroundColor: Color.White,
                  height: 50,
                  borderWidth: 1,
                  borderColor: Color.Pink2,
                }}
                titleStyle={{
                  color: Color.Pink2,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
                title="Sign In with Instagram"
              />
              {this.renderLoadingView()}
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
    instagramLinkPending: accountLinking.instagramLinkPending,
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
