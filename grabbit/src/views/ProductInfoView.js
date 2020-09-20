import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color, UserType, FakeImage} from 'grabbit/src/const';
import BrokerProductInfoDetails from 'grabbit/src/components/modals/BrokerProductInfoDetails';
import MerchantProductInfoDetails from 'grabbit/src/components/modals/MerchantProductInfoDetails';

const data = {
  id: '1',
  merchant: {
    id: '1',
    name: "George's Hats Inc. LLC IV",
  },
  name: 'Flamingo Hat LTD III',
  description: 'This is a product description',
  like: {
    id: '1',
  },
  terms:
    'Aliquam venenatis lectus id ligula iaculis, sit amet euismod nisl auctor. Sed congue blandit metus in fringilla. Vivamus fermentum semper congue. Sed maximus porta sem sed vulputate. Maecenas ante dui, finibus in sollicitudin at, pulvinar mattis nibh. ',
  image_url: FakeImage,
  image2_url: FakeImage,
  image3_url: FakeImage,
  image4_url: FakeImage,
  userHasMatch: true,
  stats: {
    grabs: 11,
    like_count: '1.1K',
    offers: 123,
    views: '11.5K',
    interest: 0.42,
  },
};

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
    };

    this.detailsModal = React.createRef();
  }

  _deriveGrabbitIconVisibility() {
    const {canGrabCurrentProduct} = this.props;
    if (!canGrabCurrentProduct) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => Actions.grabItem()}>
        <Icon name="shopping-bag" size={20} color={Color.GreyText} />
      </TouchableOpacity>
    );
  }

  _deriveModal({userType}) {
    if (userType === UserType.Broker) {
      return <BrokerProductInfoDetails ref={this.detailsModal} />;
    }

    return <MerchantProductInfoDetails ref={this.detailsModal} />;
  }

  render() {
    const {userType, currentProductHasLike, likeProduct, toggleDetailsModalForBroker} = this.props;

    const likeColor = currentProductHasLike ? Color.Pink2 : Color.GreyText;
    const likeIcon = userType === UserType.Broker ? <Icon name="heart" size={20} color={likeColor} /> : null;

    const modal = this._deriveModal({userType});
    const grabbitIcon = this._deriveGrabbitIconVisibility();

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
                  <TouchableOpacity onPress={() => likeProduct()}>{likeIcon}</TouchableOpacity>
                </View>
                <View style={styles.ProductInfoView__ContentContainer__Info__Upper__Button}>{grabbitIcon}</View>
                <View style={styles.ProductInfoView__ContentContainer__Info__Upper__Button}>
                  <TouchableOpacity onPress={() => toggleDetailsModalForBroker()}>
                    <Icon name="more-vertical" size={20} color={Color.GreyText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                style={styles.ProductInfoView__ContentContainer__Info__StatIcon}
                name="heart"
                size={20}
                color={Color.GreyText}
              />
              <Text style={styles.ProductInfoView__ContentContainer__Info__StatValue}>{data.stats.like_count}</Text>
              <Icon
                style={styles.ProductInfoView__ContentContainer__Info__StatIcon}
                name="shopping-bag"
                size={20}
                color={Color.GreyText}
              />
              <Text style={styles.ProductInfoView__ContentContainer__Info__StatValue}>{data.stats.grabs}</Text>
              <Icon
                style={styles.ProductInfoView__ContentContainer__Info__StatIcon}
                name="zap"
                size={20}
                color={Color.GreyText}
              />
              <Text style={styles.ProductInfoView__ContentContainer__Info__StatValue}>{data.stats.interest}</Text>
              <Icon
                style={styles.ProductInfoView__ContentContainer__Info__StatIcon}
                name="tv"
                size={20}
                color={Color.GreyText}
              />
              <Text style={styles.ProductInfoView__ContentContainer__Info__StatValue}>{data.stats.views}</Text>
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
  const {userType, productInfo} = state;
  return {
    userType,
    canGrabCurrentProduct: productInfo.canGrabCurrentProduct,
    showDetailsModalForBroker: productInfo.showDetailsModalForBroker,
    showDetailsModalForMerchant: productInfo.showDetailsModalForMerchant,
    currentProductHasLike: productInfo.currentProductHasLike,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDetailsModalForBroker: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_BROKER_PRODUCT_DETAILS_MODAL,
      });
    },
    likeProduct: () => {
      return dispatch({
        type: REDUX_ACTIONS.PRODUCT_INFO_LIKE,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoView);

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
    marginTop: 10,
  },
  ProductInfoView__ContentContainer__Info__StatIcon: {
    marginLeft: 10,
  },
  ProductInfoView__ContentContainer__Info__StatValue: {
    marginLeft: 5,
  },
});
