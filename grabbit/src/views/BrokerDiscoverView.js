import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import {SearchBar} from 'react-native-elements';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color} from 'grabbit/src/const';
import {httpRequestAsync} from 'grabbit/src/utils';
import BrandCampaignCodeModal from 'grabbit/src/components/modals/BrandCampaignCode';

class V extends React.Component {
  constructor(props) {
    super(props);
    // this.brandCampaignsCodeModal = React.createRef();
  }

  componentDidMount() {
    const {getBrands, user} = this.props;

    return getBrands({
      options: {
        endpoint: `/discover/${user.id}/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json;charset-utf8',
          'X-Grabbit-Token': user.session_token_key,
        },
      },
    });
  }

  brandListItem({item, index}) {
    const {toggleBrokerDiscoverBrandCampaignModal} = this.props;
    return (
      <TouchableOpacity
        onPress={() => toggleBrokerDiscoverBrandCampaignModal({campaignCode: item.latest_campaign_code})}>
        <View style={styles.BrandListItem__ContentContainer}>
          <Image source={{uri: item.image_url}} style={{height: 120, width: 120}} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {updateBrandViewSearchInput, brands, clearBrandViewSearchInput, brandViewSearchInputValue} = this.props;

    const filteredBrands = !brandViewSearchInputValue
      ? brands.all
      : brands.all.filter((brandItem) => brandItem.name.startsWith(brandViewSearchInputValue));

    // const modal = <BrandCampaignCodeModal ref={this.brandCampaignsCodeModal} />;
    const modal = <BrandCampaignCodeModal childRef={(ref) => (this.childRef = ref)} />;
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        {modal}
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 100,
              padding: 20,
              width: '100%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 42,
              }}>
              Discover
            </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: 'red',
                padding: 10,
              }}>
              <SearchBar
                containerStyle={{
                  height: 40,
                  width: '80%',
                  backgroundColor: Color.White,
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent',
                }}
                inputContainerStyle={{
                  height: 40,
                  backgroundColor: Color.White,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: Color.LightGrey,
                  borderBottomWidth: 1,
                }}
                inputStyle={{
                  fontSize: 12,
                  height: 40,
                  color: Color.Black,
                  // borderWidth: 1,
                  // borderColor: Color.LightGrey,
                }}
                value={brandViewSearchInputValue}
                onChangeText={(text) => updateBrandViewSearchInput({text})}
                lightTheme={true}
                clearIcon={
                  <TouchableOpacity onPress={() => clearBrandViewSearchInput()}>
                    <Icon name="x" size={20} color={Color.ReadableGreyText} />
                  </TouchableOpacity>
                }
                searchIcon={
                  <TouchableOpacity>
                    <Icon name="search" size={20} color={Color.ReadableGreyText} />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: '100%',
                padding: 20,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: Color.Black,
                }}>
                Popular Brands
              </Text>
            </View>
            <FlatList
              contentContainerStyle={{
                // borderWidth: 1,
                // borderColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              horizontal={true}
              data={brands.featured.row0}
              renderItem={({item, index}) => {
                return this.brandListItem({item, index});
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
            <FlatList
              horizontal={true}
              data={brands.featured.row1}
              renderItem={({item, index}) => {
                return this.brandListItem({item, index});
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                marginTop: 20,
                marginBottom: 10,
                padding: 10,
                width: '100%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'blue',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  All Brands
                </Text>
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'red',
                  position: 'absolute',
                  right: 20,
                }}>
                <TouchableOpacity onPress={() => Actions.brokerAllBrandsView()}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.HyperLink,
                    }}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              contentContainerStyle={{
                marginBottom: 20,
              }}
              horizontal={true}
              data={filteredBrands}
              renderItem={({item, index}) => {
                return this.brandListItem({item, index});
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {brokerDiscover, session} = state;
  return {
    hasCopiedCurrentCampaignCode: brokerDiscover.hasCopiedCurrentCampaignCode,
    user: session.user,
    brandViewSearchInputValue: brokerDiscover.brandViewSearchInput,
    brands: brokerDiscover.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBrandViewSearchInput: ({text}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_BROKER_BRAND_VIEW_SEARCH_INPUT,
        payload: text,
      });
    },

    clearBrandViewSearchInput: () => {
      return dispatch({
        type: REDUX_ACTIONS.CLEAR_BROKER_BRAND_VIEW_SEARCH_INPUT,
      });
    },

    toggleBrokerDiscoverBrandCampaignModal: ({campaignCode}) => {
      dispatch({
        type: REDUX_ACTIONS.TOGGLE_BROKER_BRAND_CAMPAIGN_MODAL,
      });

      dispatch({
        type: REDUX_ACTIONS.SET_CURRENT_CAMPAGIN_CODE,
        payload: campaignCode,
      });
    },

    getBrands: async ({options}) => {
      dispatch({
        type: REDUX_ACTIONS.CLEAR_BROKER_GET_BRANDS_ERROR,
      });

      dispatch({
        type: REDUX_ACTIONS.BROKER_GET_BRANDS_PENDING,
      });

      const {error, data} = await httpRequestAsync({options});

      if (error) {
        return dispatch({
          type: REDUX_ACTIONS.BROKER_GET_BRANDS_ERROR,
          payload: error,
        });
      }

      return dispatch({
        type: REDUX_ACTIONS.BROKER_GET_BRANDS_SUCCESS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  BrandListItem__ContentContainer: {
    height: 120,
    width: 120,
    marginLeft: 6,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: 'blue',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
