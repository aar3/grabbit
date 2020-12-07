import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, TextInput} from 'react-native';

import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

import {httpRequestAsync} from 'grabbit/src/utils';
import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color, FakeImage} from 'grabbit/src/const';
import styles from 'grabbit/src/styles/global';

const options = {
  title: 'Choose Image',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class M extends React.Component {
  constructor(props) {
    super(props);
  }

  show() {
    const {toggleMerchantBrandCreateModal} = this.props;
    toggleMerchantBrandCreateModal();
  }

  hide() {
    const {toggleMerchantBrandCreateModal} = this.props;
    toggleMerchantBrandCreateModal();
  }

  renderErrorLabel() {
    const {postCurrentBrandError} = this.props;
    const text = !postCurrentBrandError ? null : (
      <Text
        style={{
          color: Color.CherryRed,
        }}>
        {postCurrentBrandError.details}
      </Text>
    );

    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'green',
          height: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        {text}
      </View>
    );
  }

  selectImage() {
    const {setCurrentBrandCreateImage, user, currentCreateBrand} = this.props;

    const formData = new FormData();

    ImagePicker.showImagePicker(options, (response) => {
      console.log(Object.keys(response));

      if (response.didCancel) {
        console.log('Merchant Product ImagePicker upload cancelled');
      } else if (response.error) {
        console.log('Merchant Product ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Merchant Product ImagePicker success');

        formData.append('name', 'image');
        formData.append('user_id', user.id);
        formData.append('file', response.data, {
          type: 'application/octet-stream',
        });

        return setCurrentBrandCreateImage({
          options: {
            endpoint: `/brands/${currentCreateBrand.id}/upload/`,
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-Grabbit-Token': user.session_token_key,
            },
          },
        });
      }
    });
  }

  componentDidMount() {
    const {clearBrandEditImageError, childRef} = this.props;
    childRef(this);
    return clearBrandEditImageError();
  }

  componentWillUnmount() {
    const {childRef} = this.props;
    childRef(undefined);
  }

  render() {
    const {
      user,
      toggleMerchantBrandCreateModal,
      updateCurrentCreateBrandDetails,
      currentCreateBrand,
      showMerchantBrandCreateModal,
      postCurrentCreateBrand,
    } = this.props;
    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={showMerchantBrandCreateModal}
        onRequestClose={() => {
          console.log('modal closed');
          toggleMerchantBrandCreateModal();
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: 190,
            marginBottom: 280,
            marginLeft: 30,
            marginRight: 30,
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
            <TouchableOpacity onPress={() => toggleMerchantBrandCreateModal()}>
              <Icon name="x" size={15} color={Color.GreyText} />
            </TouchableOpacity>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => this.selectImage()}>
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'green',
                    borderRadius: 100,
                    height: 100,
                    width: 100,
                    overflow: 'hidden',
                  }}>
                  <Image source={{uri: currentCreateBrand.image_url || FakeImage}} style={{height: 100, width: 100}} />
                </View>
              </TouchableOpacity>
              {this.renderErrorLabel()}
              <View style={styles.TextInput__Container}>
                <Text style={styles.TextInput__Label}>Name</Text>
                <TextInput
                  autoCapitalize={'none'}
                  value={currentCreateBrand.name}
                  onChangeText={(text) => updateCurrentCreateBrandDetails({value: text, key: 'name'})}
                  style={styles.TextInput__Container__Input}
                />
              </View>
              <View style={styles.TextInput__Container}>
                <Text style={styles.TextInput__Label}>Description</Text>
                <TextInput
                  multiline={true}
                  autoCapitalize={'none'}
                  value={currentCreateBrand.description}
                  onChangeText={(text) => updateCurrentCreateBrandDetails({value: text, key: 'description'})}
                  style={[styles.TextInput__Container__Input, {height: 75}]}
                />
              </View>
              <Button
                containerStyle={{
                  marginTop: 10,
                }}
                onPress={() =>
                  postCurrentCreateBrand({
                    options: {
                      endpoint: `/brands/`,
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-Grabbit-Token': user.session_token_key,
                      },
                      data: {
                        brand: currentCreateBrand,
                        user_id: user.id,
                      },
                    },
                  })
                }
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
                title="Create"
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings, session} = state;
  return {
    postCurrentBrandError: settings.postCurrentBrandError,
    updateCurrentEditBrandImageError: settings.updateCurrentEditBrandImageError,
    user: session.user,
    currentCreateBrand: settings.currentCreateBrand,
    showMerchantBrandCreateModal: settings.showMerchantBrandCreateModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearBrandEditImageError: () => {
      dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_BRAND_CREATE_IMAGE_ERROR,
      });
    },
    toggleMerchantBrandCreateModal: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_MERCHANT_BRAND_CREATE_MODAL,
      });
    },
    updateCurrentCreateBrandDetails: ({key, value}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_CURRENT_CREATE_BRAND_DETAILS,
        payload: value,
        key,
      });
    },
    postCurrentCreateBrand: async ({options}) => {
      dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_BRAND_CREATE_ERROR,
      });

      const {data, error} = await httpRequestAsync({options});

      if (error) {
        dispatch({
          type: REDUX_ACTIONS.POST_CURRENT_BRAND_CREATE_ERROR,
          payload: error,
        });
      }

      dispatch({
        type: REDUX_ACTIONS.POST_CURRENT_BRAND_CREATE_SUCCESS,
        payload: data,
      });

      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_MERCHANT_BRAND_CREATE_MODAL,
      });
    },
    setCurrentBrandCreateImage: async ({options}) => {
      // TODO: should attempt to upload the image, then set it in the state on success (fallback on error)
      dispatch({
        type: REDUX_ACTIONS.PUT_CURRENT_BRAND_CREATE_IMAGE_PENDING,
      });

      const {data, error} = await httpRequestAsync({options});

      if (error) {
        error.details = error.statusCode === 400 ? 'Error uploading image' : error.details;

        return dispatch({
          type: REDUX_ACTIONS.PUT_CURRENT_BRAND_CREATE_IMAGE_ERROR,
          payload: error,
        });
      }

      return dispatch({
        type: REDUX_ACTIONS.PUT_CURRENT_BRAND_CREATE_IMAGE_SUCCESS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);
