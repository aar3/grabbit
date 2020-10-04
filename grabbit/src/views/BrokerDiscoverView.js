import React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity, TouchableHighlight} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import {SearchBar} from 'react-native-elements';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {FakeImage, Color} from 'grabbit/src/const';

const data = {
  featured: {
    row0: [
      {
        id: '1101',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
      {
        id: '1102',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
      {
        id: '1103',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
      {
        id: '1104',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
    ],
    row1: [
      {
        id: '1105',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
      {
        id: '1106',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
      {
        id: '1107',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
      {
        id: '1108',
        image_url: FakeImage,
        post_tag_id: '#SomeTagHere123',
      },
    ],
  },
  all: [
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
    {
      id: '1',
      image_url: FakeImage,
      post_tag_id: '#SomeTagHere123',
    },
  ],
};

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  brandListItem({item, index}) {
    return (
      <TouchableOpacity>
        <View style={styles.BrandListItem__ContentContainer}>
          <Image source={{uri: item.image_url}} style={{height: 90, width: 90}} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {updateBrandViewSearchInput, clearBrandViewSearchInput, brandViewSearchInputValue} = this.props;
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'red',
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
          {/* <View
            style={{
              borderWidth: 1,
              borderColor: 'blue',
              padding: 10,
              width: '100%',
            }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
            }}>Choose/Search Your Brand</Text>
          </View> */}
          <View
            style={{
              borderWidth: 1,
              borderColor: 'green',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                padding: 10,
                borderColor: 'red',
              }}>
              <SearchBar
                containerStyle={{
                  // height: 50,
                  width: '80%',
                  backgroundColor: Color.White,
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent',
                }}
                inputContainerStyle={{
                  height: 50,
                  backgroundColor: Color.White,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: Color.LightGrey,
                  borderBottomWidth: 1,
                }}
                inputStyle={{
                  fontSize: 12,
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
              borderWidth: 1,
              borderColor: 'pink',
              // height: 300,
              width: '100%',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'red',
                width: '100%',
                height: 50,
              }}>
              <Text>Popular Brands</Text>
            </View>
            <FlatList
              horizontal={true}
              data={data.featured.row0}
              renderItem={({item, index}) => {
                return this.brandListItem({item, index});
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
            <FlatList
              horizontal={true}
              data={data.featured.row1}
              renderItem={({item, index}) => {
                return this.brandListItem({item, index});
              }}
              keyExtractor={(_item, index) => index.toString()}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: 'red',
                width: '100%',
                height: 50,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'blue',
                }}>
                <Text>All Brands</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  position: 'absolute',
                  right: 0,
                }}>
                <TouchableOpacity onPress={() => Actions.brokerAllBrandsView()}>
                  <Text>View All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              horizontal={true}
              data={data.all.slice(0, 4)}
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
  const {brokerDiscover} = state;
  return {
    brandViewSearchInputValue: brokerDiscover.brandViewSearchInput,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  BrandListItem__ContentContainer: {
    height: 90,
    width: 90,
    marginLeft: 10,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: 'blue',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
