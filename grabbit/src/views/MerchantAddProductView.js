import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';

import {Color, FakeImage} from 'grabbit/src/const';
import {BasicTextInput, BasicTextAreaInput} from 'grabbit/src/components/text-input';
import {BasicButton} from 'grabbit/src/components/buttons';

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
      imageSources: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      conversionAttribution: null,
      impressionAttribution: null,
    };
  }

  _updateSelectedImage({imagePositionKey}) {
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
        const imageSources = {
          ...this.state.imageSources,
          ...{[imagePositionKey]: {uri: response.uri}},
        };

        this.setState({imageSources});
        console.log(this.state);
      }
    });
  }

  renderRowItem({imagePositionKey}) {
    if (this.state.imageSources[imagePositionKey]) {
      const imageURI = this.state.imageSources[imagePositionKey];
      console.log('>>>> image uri: ', imageURI);
      return <Image source={imageURI} style={{flex: 1, height: undefined, width: undefined}} />;
    }

    return <Icon name="plus-circle" size={30} color={Color.GreyText} />;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.MerchantAddProduct}>
        <View style={styles.MerchantAddProduct__Image}>
          <Image source={{uri: FakeImage}} style={{height: 100, width: 100}} />
        </View>
        <View style={styles.MerchantAddProduct__ContentContainer}>
          <BasicTextInput label="Product Name" />
          <BasicTextAreaInput label="Product Description" />
          <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer}>
            <Text style={styles.MerchantAddProductView__ContentContainer__Label}>{'Upload Product Images'}</Text>
            <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer__Row}>
              <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer__Row__Item}>
                <TouchableOpacity onPress={() => this._updateSelectedImage({imagePositionKey: '1'})}>
                  {this.renderRowItem({imagePositionKey: '1'})}
                </TouchableOpacity>
              </View>
              <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer__Row__Item}>
                <TouchableOpacity onPress={() => this._updateSelectedImage({imagePositionKey: '2'})}>
                  {this.renderRowItem({imagePositionKey: '2'})}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer__Row}>
              <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer__Row__Item}>
                <TouchableOpacity onPress={() => this._updateSelectedImage({imagePositionKey: '3'})}>
                  {this.renderRowItem({imagePositionKey: '3'})}
                </TouchableOpacity>
              </View>
              <View style={styles.MerchantAddProduct__ContentContainer__ImageContainer__Row__Item}>
                <TouchableOpacity onPress={() => this._updateSelectedImage({imagePositionKey: '4'})}>
                  {this.renderRowItem({imagePositionKey: '4'})}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.MerchantAddProductView__ContentContainer__Label}>{'Designate Attribution'}</Text>
          <View style={styles.MerchantAddProductView__ContentContainer__Attribution}>
            <CheckBox
              onCheckColor={Color.Pink2}
              lineWidth={1.0}
              boxType={'square'}
              animationDuration={0.25}
              onTintColor={Color.Pink2}
              style={styles.MerchantAddProduct__ContentContainer__Checkbox}
              disabled={false}
              value={this.state.impressionAttribution}
              onValueChange={() =>
                this.setState({
                  impressionAttribution: !this.state.impressionAttribution,
                })
              }
            />
            <Text
              style={{
                fontSize: 10,
                marginLeft: 10,
              }}>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada vestibulum tellus, a malesuada ex accumsan id. Cras venenatis justo quis nunc ornare tincidunt. Aliquam vestibulum nulla nec dui lacinia laoreet.'
              }
            </Text>
          </View>
          <View style={styles.MerchantAddProductView__ContentContainer__Attribution}>
            <CheckBox
              onCheckColor={Color.Pink2}
              lineWidth={1.0}
              animationDuration={0.25}
              boxType={'square'}
              onTintColor={Color.Pink2}
              style={styles.MerchantAddProduct__ContentContainer__Checkbox}
              disabled={false}
              value={this.state.conversionAttribution}
              onValueChange={() =>
                this.setState({
                  conversionAttribution: !this.state.conversionAttribution,
                })
              }
            />
            <Text
              style={{
                fontSize: 10,
                marginLeft: 10,
              }}>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada vestibulum tellus, a malesuada ex accumsan id. Cras venenatis justo quis nunc ornare tincidunt. Aliquam vestibulum nulla nec dui lacinia laoreet.'
              }
            </Text>
          </View>
          <BasicButton
            title="Add"
            buttonStyle={{
              width: 300,
              height: 50,
              justifyContent: 'center',
              borderColor: Color.Pink2,
              borderWidth: 1,
              backgroundColor: Color.White,
              alignItems: 'center',
              borderRadius: 40,
              marginTop: 20,
              marginBottom: 30,
            }}
            titleStyle={{
              color: Color.Pink2,
              fontWeight: 'bold',
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  MerchantAddProduct: {
    flexGrow: 1,
    alignItems: 'center',
  },
  MerchantAddProduct__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    // width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  MerchantAddProduct__Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 30,
    marginTop: 30,
  },
  MerchantAddProduct__ContentContainer__ImageContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: 325,
    borderTopColor: Color.LightGrey,
    borderTopWidth: 1,
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
    marginTop: 30,
    paddingBottom: 10,
  },
  MerchantAddProduct__ContentContainer__ImageContainer__Row: {
    // borderWidth: 1,
    // borderColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 10,
  },
  MerchantAddProduct__ContentContainer__ImageContainer__Row__Item: {
    borderWidth: 1,
    borderColor: Color.GreyText,
    opacity: 0.5,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    borderRadius: 20,
  },
  MerchantAddProduct__ContentContainer__Checkbox: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: 20,
    height: 20,
  },
  MerchantAddProductView__ContentContainer__Attribution: {
    // borderWidth: 1,
    // borderColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: 350,
    // borderTopColor: Color.LightGrey,
    // borderTopWidth: 1,
  },
  MerchantAddProductView__ContentContainer__Label: {
    fontSize: 15,
    color: Color.Pink2,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
