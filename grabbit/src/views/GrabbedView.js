import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {FakeImage, Color} from 'grabbit/src/const';

import GrabbedItemFeedbackModal from 'grabbit/src/components/modals/GrabbedItemFeedback';

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

export default class GrabbedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.grabbedItemFeedbackModal = React.createRef();
  }

  render() {
    const grabbedItemFeedbackModal = <GrabbedItemFeedbackModal ref={this.grabbedItemFeedbackModal} />;
    return (
      <View style={styles.GrabbedView}>
        {grabbedItemFeedbackModal}
        <FlatList
          style={styles.GrabbedView__FlatList}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => this.grabbedItemFeedbackModal.current.show()}>
                <View style={styles.FlatListRow__Container}>
                  <View style={styles.FlatListRow__Container__Image}>
                    <Image source={{uri: item.image_url}} style={{height: 75, width: 75}} />
                  </View>
                  <View style={styles.FlatListRow__Container__Info}>
                    <Text style={{marginBottom: 5}}>{item.product.name}</Text>
                    <Text style={{marginBottom: 5, color: Color.GreyText}}>{item.product.merchant.name}</Text>
                    <Text style={{marginBottom: 5, color: Color.Pink2}}>{item.shipping.shipped_on}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  GrabbedView: {
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
  GrabbedView__FlatList: {
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
