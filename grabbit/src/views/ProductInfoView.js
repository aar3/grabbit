import React from 'react';
import {StyleSheet, Text, Modal, View, TouchableOpacity, Image, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {Color, UserType, FakeImage} from 'grabbit/src/const';
import {BasicButton} from 'grabbit/src/components/buttons';
import BrokerModal from 'grabbit/src/components/modals/BrokerProductInfoDetails';

const data = {
  id: '1',
  merchant: {
    id: '1',
    name: "George's Hats Inc. LLC IV",
  },
  name: 'Flamingo Hat LTD III',
  description: 'This is a product description',
  liked: {
    id: '1',
  },
  terms:
    'Aliquam venenatis lectus id ligula iaculis, sit amet euismod nisl auctor. Sed congue blandit metus in fringilla. Vivamus fermentum semper congue. Sed maximus porta sem sed vulputate. Maecenas ante dui, finibus in sollicitudin at, pulvinar mattis nibh. ',
  image_url: FakeImage,
  image2_url: FakeImage,
  image3_url: FakeImage,
  image4_url: FakeImage,
};

const detailSelections = [
  {
    id: '0',
    title: 'Leave Feedback',
    onPress: () => console.log('Feedback left'),
  },
  {
    id: '1',
    title: 'Report a problem with this Product',
    onPress: () => console.log('Product problem reported'),
  },
  {
    id: '2',
    title: 'Report a problem with this Merchant',
    onPress: () => console.log('Merchant problem reported'),
  },
  {
    id: '3',
    title: 'Report another problem',
    onPress: () => console.log('Another problem reported'),
  },
];

class DetailsItem extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity onPress={data.onPress}>
        <View style={styles.DetailsItem}>
          <Text>{data.title}</Text>
          <Icon style={{position: 'absolute', right: 10}} name="chevron-right" size={15} color={Color.GreyText} />
        </View>
      </TouchableOpacity>
    );
  }
}

class ProductInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLike: false,
      showDetailsModal: false,
    };

    this.modal = React.createRef();
  }

  _renderDetailItem({item, index}) {
    return <DetailsItem data={item} />;
  }

  render() {
    const {userType} = this.props;

    const color = this.state.hasLike ? Color.Pink2 : Color.GreyText;
    const likeIcon = userType === UserType.Broker ? <Icon name="heart" size={20} color={color} /> : null;
    const modal = userType === UserType.Broker ? <BrokerModal ref={this.modal} /> : null;

    return (
      <View style={styles.ProductInfoView}>
        {modal}
        <View style={styles.ProductInfoView__ContentContainer}>
          <View style={styles.ProductInfoView__ContentContainer__Header}>
            <Image source={{uri: data.image_url}} style={{height: 375, width: 375, borderRadius: 15}} />
          </View>
          <View style={styles.ProductInfoView__ContentContainer__Images}>
            <Image source={{uri: data.image_url}} style={{height: 100, width: 100, borderRadius: 15}} />
            <Image source={{uri: data.image_url}} style={{height: 100, width: 100, borderRadius: 15}} />
            <Image source={{uri: data.image_url}} style={{height: 100, width: 100, borderRadius: 15}} />
          </View>
          <View style={styles.ProductInfoView__ContentContainer__Info}>
            <View style={styles.ProductInfoView__ContentContainer__Info__Upper}>
              <View style={styles.ProductInfoView__ContentContainer__Info__Upper__Label}>
                <Text
                  style={{
                    fontWeight: '300',
                    color: Color.DarkerGrey,
                    marginBottom: 5,
                  }}>
                  {data.name}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.Black,
                  }}>
                  {data.merchant.name}
                </Text>
              </View>
              <View
                style={{
                  // borderColor: 'blue',
                  // borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: 100,
                }}>
                <View style={styles.ProductInfoView__ContentContainer__Info__Upper__Button}>
                  <TouchableOpacity onPress={() => this.setState({hasLike: !this.state.hasLike})}>
                    {likeIcon}
                  </TouchableOpacity>
                </View>
                <View style={styles.ProductInfoView__ContentContainer__Info__Upper__Button}>
                  {/* TODO: if item is grabbed, it's grey, else pink */}
                  <TouchableOpacity
                    onPress={() => {
                      return Actions.grabItem();
                    }}>
                    <Icon name="shopping-bag" size={20} color={Color.GreyText} />
                  </TouchableOpacity>
                </View>
                <View style={styles.ProductInfoView__ContentContainer__Info__Upper__Button}>
                  <TouchableOpacity
                    onPress={() => {
                      this.modal.current.show();
                    }}>
                    <Icon name="more-vertical" size={20} color={Color.GreyText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.ProductInfoView__ContentContainer__Info__Description}>
              <Text style={{color: Color.DarkerGrey}}>{data.terms}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {userType} = state;
  return {
    userType,
  };
};

export default connect(mapStateToProps)(ProductInfoView);

const styles = StyleSheet.create({
  ProductInfoView: {
    flex: 1,
    alignItems: 'center',
  },
  ProductInfoView__ModalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 300,
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
  },
  ProductInfoView__ModalContainer__TopBar: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '100%',
  },
  ProductInfoView__ModalContainer__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProductInfoView__ModalContainer__ContentContainer__Header: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 50,
    height: 50,
  },
  ProductInfoView__ModalContainer__ContentContainer__Selections: {
    // borderWidth: 1,
    // borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  ProductInfoView__ModalContainer__ContentContainer__Selections__FlatList: {
    width: '100%',
    marginBottom: -20,
    // borderWidth: 1,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderColor: Color.LightGrey,
  },
  DetailsItem: {
    // borderWidth: 1,
    // borderColor: 'green',
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
  },
  ProductInfoView__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProductInfoView__ContentContainer__Header: {
    // borderWidth: 1,
    // borderColor: 'orange',
    marginTop: 20,
    marginBottom: 25,
  },
  ProductInfoView__ContentContainer__Images: {
    // borderWidth: 1,
    // borderColor: 'blue',
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  ProductInfoView__ContentContainer__Info: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '90%',
  },
  ProductInfoView__ContentContainer__Info__Upper: {
    // borderWidth: 1,
    // borderColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  ProductInfoView__ContentContainer__Info__Upper__Label: {
    // borderWidth: 1,
    // borderColor: 'green',
    padding: 10,
  },
  ProductInfoView__ContentContainer__Info__Upper__Button: {
    // borderWidth: 1,
    // borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProductInfoView__ContentContainer__Info__Description: {
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 10,
  },
});