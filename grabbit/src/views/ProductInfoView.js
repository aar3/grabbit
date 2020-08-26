import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {BasicButton} from 'grabbit/src/components/buttons';

const data = {
  id: '1',
  merchant: {
    id: '1',
    name: 'Some Company',
  },
  name: 'Flamingo Hat LTD III',
  description: 'This is a product description',
  terms:
    'Aliquam venenatis lectus id ligula iaculis, sit amet euismod nisl auctor. Sed congue blandit metus in fringilla. Vivamus fermentum semper congue. Sed maximus porta sem sed vulputate. Maecenas ante dui, finibus in sollicitudin at, pulvinar mattis nibh. ',
  image_url:
    'https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg',
  image2_url:
    'https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg',
  image3_url:
    'https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg',
  image4_url:
    'https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg',
};

export default class ProductInfoView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ProductInfo__ContentContainer}>
          <View style={styles.ProductInfo__ContentContainer__Header}>
            <Image
              source={{uri: data.image_url}}
              style={{height: 375, width: 375}}
            />
          </View>
          <View style={styles.ProductInfo__ContentContainer__Images}>
            <Image
              source={{uri: data.image_url}}
              style={{height: 100, width: 100}}
            />
            <Image
              source={{uri: data.image_url}}
              style={{height: 100, width: 100}}
            />
            <Image
              source={{uri: data.image_url}}
              style={{height: 100, width: 100}}
            />
          </View>
          <View style={styles.ProductInfo__ContentContainer__Info}>
            <View style={styles.ProductInfo__ContentContainer__Info__Upper}>
              <View
                style={
                  styles.ProductInfo__ContentContainer__Info__Upper__Label
                }>
                <Text style={{fontWeight: '100'}}>{data.name}</Text>
                <Text>{''}</Text>
                <Text style={{fontWeight: 'bold'}}>{data.merchant.name}</Text>
              </View>
              <View
                style={
                  styles.ProductInfo__ContentContainer__Info__Upper__LikeButton
                }>
                <BasicButton />
              </View>
            </View>
            <View style={styles.ProductInfo__ContentContainer__Info__Terms}>
              <Text>{data.terms}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ProductInfo__ContentContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProductInfo__ContentContainer__Header: {
    borderWidth: 1,
    borderColor: 'orange',
    marginBottom: 20,
  },
  ProductInfo__ContentContainer__Images: {
    borderWidth: 1,
    borderColor: 'blue',
    height: 100,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  ProductInfo__ContentContainer__Info: {
    borderWidth: 1,
    borderColor: 'green',
    width: '100%',
  },
  ProductInfo__ContentContainer__Info__Upper: {
    borderWidth: 1,
    borderColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  ProductInfo__ContentContainer__Info__Upper__Label: {
    borderWidth: 1,
    borderColor: 'green',
  },
  ProductInfo__ContentContainer__Info__Upper__LikeButton: {
    borderWidth: 1,
    borderColor: 'pink',
  },
  ProductInfo__ContentContainer__Info__Terms: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
  },
});
