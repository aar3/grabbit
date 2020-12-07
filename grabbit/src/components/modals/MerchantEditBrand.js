import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, TextInput} from 'react-native';

import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

import {httpRequestAsync} from 'grabbit/src/utils';
import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color} from 'grabbit/src/const';
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

  componentDidMount() {
    const {childRef} = this.props;
    childRef(this);
  }

  componentWillUnmount() {
    const {childRef} = this.props;
    childRef(undefined);
  }

  show() {
    const {toggleMerchantBrandEditModal} = this.props;
    toggleMerchantBrandEditModal();
  }

  hide() {
    const {toggleMerchantBrandEditModal} = this.props;
    toggleMerchantBrandEditModal();
  }

  renderErrorLabel() {
    const {updateCurrentEditBrandImageError} = this.props;

    const text = !updateCurrentEditBrandImageError ? null : (
      <Text
        style={{
          color: Color.CherryRed,
        }}>
        {updateCurrentEditBrandImageError.details}
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
    const {setCurrentBrandEditImage, user, currentEditBrand} = this.props;

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

        return setCurrentBrandEditImage({
          options: {
            endpoint: `/brands/${currentEditBrand.id}/upload/`,
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
    const {clearBrandEditImageError} = this.props;
    return clearBrandEditImageError();
  }

  render() {
    const {
      toggleMerchantBrandEditModal,
      updateCurrentEditBrandDetails,
      currentEditBrand,
      showMerchantBrandEditModal,
    } = this.props;

    console.log(currentEditBrand);

    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={showMerchantBrandEditModal}
        onRequestClose={() => {
          console.log('modal closed');
          toggleMerchantBrandEditModal();
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
            <TouchableOpacity onPress={() => toggleMerchantBrandEditModal()}>
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
                    // borderColor: 'red',
                    borderRadius: 100,
                    height: 100,
                    width: 100,
                    overflow: 'hidden',
                  }}>
                  <Image source={{uri: currentEditBrand.image_url}} style={{height: 100, width: 100}} />
                </View>
              </TouchableOpacity>
              {this.renderErrorLabel()}
              <View style={styles.TextInput__Container}>
                <Text style={styles.TextInput__Label}>Name</Text>
                <TextInput
                  autoCapitalize={'none'}
                  value={currentEditBrand.name}
                  onChangeText={(text) => updateCurrentEditBrandDetails({value: text, key: 'name'})}
                  style={styles.TextInput__Container__Input}
                />
              </View>
              <View style={styles.TextInput__Container}>
                <Text style={styles.TextInput__Label}>Description</Text>
                <TextInput
                  multiline={true}
                  autoCapitalize={'none'}
                  value={currentEditBrand.description}
                  onChangeText={(text) => updateCurrentEditBrandDetails({value: text, key: 'description'})}
                  style={[styles.TextInput__Container__Input, {height: 75}]}
                />
              </View>
              <Button
                containerStyle={{
                  marginTop: 10,
                }}
                onPress={() => console.log('Update Brand')}
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
                title="Update"
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
    updateCurrentEditBrandImageError: settings.updateCurrentEditBrandImageError,
    user: session.user,
    currentEditBrand: settings.currentEditBrand,
    showMerchantBrandEditModal: settings.showMerchantBrandEditModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearBrandEditImageError: () => {
      dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_BRAND_EDIT_IMAGE_ERROR,
      });
    },
    toggleMerchantBrandEditModal: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_MERCHANT_BRAND_EDIT_MODAL,
      });
    },
    updateCurrentEditBrandDetails: ({key, value}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_CURRENT_EDIT_BRAND_DETAILS,
        payload: value,
        key,
      });
    },
    setCurrentBrandEditImage: async ({options}) => {
      // TODO: should attempt to upload the image, then set it in the state on success (fallback on error)
      dispatch({
        type: REDUX_ACTIONS.POST_CURRENT_BRAND_EDIT_IMAGE_PENDING,
      });

      const {data, error} = await httpRequestAsync({options});

      if (error) {
        error.details = error.statusCode === 400 ? 'Error uploading image' : error.details;

        return dispatch({
          type: REDUX_ACTIONS.POST_CURRENT_BRAND_EDIT_IMAGE_ERROR,
          payload: error,
        });
      }

      return dispatch({
        type: REDUX_ACTIONS.POST_CURRENT_BRAND_EDIT_IMAGE_SUCCESS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);
