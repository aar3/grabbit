import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';

import {Color, Font} from 'grabbit/src/const';

const options = {
  title: 'Choose Image',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class MerchantAddProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

  _selectImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({imageSource: source});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ContentContainer}>
          <Text
            style={{
              fontSize: 20,
              color: Color.Pink2,
              marginBottom: 40,
            }}>
            {'Upload Product Images'}
          </Text>
          <TouchableOpacity onPress={() => this._selectImage()}>
            <Icon name="plus-circle" size={50} color={Color.Pink2} />
          </TouchableOpacity>
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
  ContentContainer: {
    height: 200,
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
