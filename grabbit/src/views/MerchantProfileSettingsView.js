import React from 'react';
import {Text, View, FlatList, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';
import {Color, FakeImage} from 'grabbit/src/const';
import MerchantCreateBrandModal from 'grabbit/src/components/modals/MerchantCreateBrand';
import MerchantEditBranddModal from 'grabbit/src/components/modals/MerchantEditBrand';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.merchantCreateBrandModal = React.createRef();
    this.merchantEditBrandModal = React.createRef();
  }

  render() {
    const {
      brands,
      rewardTiers,
      clearBrandEditImageError,
      toggleMerchantBrandCreateModal,
      toggleMerchantBrandEditModal,
    } = this.props;
    const createModal = <MerchantCreateBrandModal ref={this.merchantCreateBrandModal} />;
    const editModal = <MerchantEditBranddModal ref={this.merchantEditBrandModal} />;

    console.log('???? ', brands.length);

    const renderedBrandItems = brands.map((item) => {
      return (
        <TouchableOpacity
          onPress={() => {
            clearBrandEditImageError();
            toggleMerchantBrandEditModal({currentEditBrand: item});
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: Color.LightGrey,
              width: 350,
              height: 75,
              marginBottom: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                height: 40,
                marginLeft: 20,
                width: 40,
                overflow: 'hidden',
                borderRadius: 100,
              }}>
              <Image source={{uri: item.image_url}} style={{height: 40, width: 40}} />
            </View>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                marginLeft: 20,
                padding: 5,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 5,
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: Color.LightGrey,
                  fontSize: 11,
                }}>
                Promo Secret: {item.secret}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    const renderedRewardTiers = rewardTiers.map((item) => {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            height: 90,
            width: 350,
            padding: 15,
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 10,
            borderColor: Color.LightGrey,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 10,
              fontSize: 16,
            }}>
            {item.name}
          </Text>
          <Text>
            ${item.usd} off when Grabbers reach {item.points.toLocaleString()}
          </Text>
        </View>
      );
    });

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          alignItems: 'center',
        }}>
        {createModal}
        {editModal}
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.SectionHeader__Label}>My Brands</Text>
          <View
            style={
              {
                // borderWidth: 1,
                // borderColor: 'blue',
              }
            }>
            {renderedBrandItems}
          </View>
          <TouchableOpacity onPress={() => toggleMerchantBrandCreateModal()}>
            <Icon style={{marginTop: 0, marginBottom: 20}} name="plus-circle" size={25} color={Color.HyperLink} />
          </TouchableOpacity>
          <Text style={styles.SectionHeader__Label}>Instagram</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: Color.LightGrey,
              width: 350,
              height: 75,
              marginBottom: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                marginLeft: 20,
                padding: 5,
                justifyContent: 'center',
              }}>
              <Text>123</Text>
            </View>
          </View>
          <Text style={styles.SectionHeader__Label}>Rewards</Text>
          {renderedRewardTiers}
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearBrandEditImageError: () => {
      dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_BRAND_EDIT_IMAGE_ERROR,
      });
    },
    toggleMerchantBrandCreateModal: () => {
      dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_CREATE_BRAND,
      });
      dispatch({
        type: REDUX_ACTIONS.TOGGLE_MERCHANT_BRAND_CREATE_MODAL,
      });
    },
    toggleMerchantBrandEditModal: ({currentEditBrand}) => {
      dispatch({
        type: REDUX_ACTIONS.TOGGLE_MERCHANT_BRAND_EDIT_MODAL,
        payload: currentEditBrand,
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {session, settings} = state;
  console.log('state has ', settings.brands.length, ' brands');
  return {
    user: session.user,
    brands: settings.brands,
    rewardTiers: settings.rewardTiers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  SectionHeader__Label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
});
