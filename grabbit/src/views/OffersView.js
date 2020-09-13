import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {FakeImage, Color, Font} from 'grabbit/src/const';

import {BasicButton} from 'grabbit/src/components/buttons';
import {Actions} from 'react-native-router-flux';

const data = [
  {
    id: '2',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '2',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '3',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '4',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '5',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '6',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '7',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
  {
    id: '8',
    image_url: FakeImage,
    product: {
      name: 'Air Jordan Retro IV - Classic',
      merchant: {
        name: 'Finishe Line Brands Inc.',
      },
    },
    shipping: {
      shipped_on: 'Sent 3 days ago',
      expires: 'Expires in 3 days',
    },
    match: {
      matched_on: '11/13/2019',
    },
  },
];

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity onPress={() => Actions.brokerFeedback()}>
        <View style={styles.FlatListRow__Container}>
          <View style={styles.FlatListRow__Container__Image}>
            <Image source={{uri: data.image_url}} style={{height: 75, width: 75}} />
          </View>
          <View style={styles.FlatListRow__Container__Info}>
            <Text style={{marginBottom: 5}}>{data.product.name}</Text>
            <Text style={{marginBottom: 5, color: Color.GreyText}}>{data.product.merchant.name}</Text>
            <Text style={{marginBottom: 5, color: Color.Pink2}}>{data.shipping.expires}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class OffersView extends React.Component {
  _renderItem({item, index}) {
    return <FlatListRow data={item} />;
  }

  render() {
    return (
      <View style={styles.OffersView}>
        <FlatList
          style={styles.OffersView__FlatList}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OffersView: {
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
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
  },
  FlatListRow__Container__Image: {
    height: 75,
    width: 75,
    overflow: 'hidden',
    borderRadius: 100,
  },
  FlatListRow__Container__Info: {
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 10,
    width: '70%',
  },
  OffersView__FlatList: {
    width: '100%',
  },
  FlatListRow__Container__Info__Actions: {
    // borderWidth: 1,
    // borderColor: 'blue',
    marginTop: 5,
  },
  CustomIssueButton: {
    width: 100,
    height: 20,
    backgroundColor: Color.White,
    borderColor: Color.Pink2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
