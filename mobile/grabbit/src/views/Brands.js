import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {ErrorView, LoadingView, GrabbitButton} from 'grabbit/src/components/Basic';
import {getStateForKey, httpStateUpdate} from 'grabbit/src/lib/Utils';
import {SearchBar, Button} from 'react-native-elements';
import {Color} from 'grabbit/src/lib/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getBrands();
    this.getFollowedBrands();
  }

  getBrands() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/brands/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetBrands',
    });
  }

  getFollowedBrands() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/brands/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetFollowedBrands',
    });
  }

  _objectContainsItem(set, itemId) {
    const item = Object.values(set).find((item) => item.brand.id === itemId);
    return {exists: typeof item === 'object', item};
  }

  _renderFollowButton(brand) {
    const {exists, item} = this._objectContainsItem(this.props.followedBrands, brand.id);
    if (!exists) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            position: 'absolute',
            right: 5,
          }}>
          <Button
            onPress={() => {
              return httpStateUpdate({
                dispatch: this.props.dispatch,
                options: {
                  endpoint: `/users/${this.props.user.id}/brands/`,
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'X-Session-Token': this.props.user.current_session_token,
                  },
                  data: {
                    user_id: this.props.user.id,
                    brand_id: brand.id,
                  },
                },
                stateKeyPrefix: 'PostFollowedBrand',
              });
            }}
            buttonStyle={{
              width: 75,
              height: 40,
              borderRadius: 5,
              backgroundColor: Color.OceanBlue,
              // borderWidth: 1,
              // borderColor: Color.OceanBlue,
            }}
            titleStyle={{
              fontSize: 12,
              color: Color.White,
              fontWeight: 'bold',
            }}
            title={'Follow'}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          position: 'absolute',
          right: 5,
        }}>
        <Button
          onPress={() => {
            return httpStateUpdate({
              dispatch: this.props.dispatch,
              options: {
                endpoint: `/users/${this.props.user.id}/brands/${item.id}/`,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'X-Session-Token': this.props.user.current_session_token,
                },
              },
              stateKeyPrefix: 'DeleteFollowedBrand',
            });
          }}
          buttonStyle={{
            width: 75,
            height: 40,
            borderRadius: 5,
            backgroundColor: Color.White,
            borderWidth: 1,
            borderColor: Color.OceanBlue,
          }}
          titleStyle={{
            fontSize: 12,
            color: Color.OceanBlue,
            fontWeight: 'bold',
          }}
          title={'Unfollow'}
        />
      </View>
    );
  }

  render() {
    const brands = !this.props.search
      ? this.props.brands
      : this.props.brands.filter((item) => item.name.startsWith(this.props.search));

    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: Color.ReadableGreyText,
              }}>
              Follow you favorite brands to get better matches
            </Text>
          </View>
          <SearchBar
            lightTheme
            value={this.props.search}
            onChangeText={(text) =>
              this.props.dispatch({
                type: ReduxActions.Brands.UpdateBrandSearch,
                payload: text,
              })
            }
            containerStyle={{
              width: '100%',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              backgroundColor: Color.White,
            }}
            clearIcon={<Icon name="close" size={20} color={Color.ReadableGreyText} />}
            searchIcon={<Icon name="search-outline" size={20} color={Color.ReadableGreyText} />}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: Color.BorderLightGrey,
              backgroundColor: Color.White,
              borderBottomWidth: 1,
            }}
            inputStyle={{
              fontSize: 14,
            }}
            placeholder="Search Brands"
          />
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            width: '100%',
          }}>
          <FlatList
            style={{
              width: '100%',
            }}
            onRefresh={() => this.getBrands()}
            refreshing={this.props.getBrandsPending}
            keyExtractor={(_item, index) => index.toString()}
            data={brands}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: '100%',
                    padding: 5,
                    // borderWidth: 1,
                    // borderColor: 'green',
                    borderBottomColor: Color.BorderLightGrey,
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'green',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'red',
                        marginLeft: 20,
                        borderRadius: 100,
                        width: 50,
                        height: 50,
                        overflow: 'hidden',
                      }}>
                      <Image source={{uri: item.img_url}} style={{width: 50, height: 50}} />
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'blue',
                        marginLeft: 40,
                      }}>
                      <Text
                        style={{
                          color: Color.OceanBlue,
                          fontSize: 16,
                          fontWeight: '500',
                        }}>
                        {item.name.toUpperCase()}
                      </Text>
                    </View>
                    {this._renderFollowButton(item)}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const brands = getStateForKey('state.brands.list.items', state);
  const followedBrands = getStateForKey('state.brands.following.items', state);

  return {
    user: getStateForKey('state.session.user', state),
    brands: Object.values(brands),
    getBrandsPending: getStateForKey('state.brands.list.pending', state),
    getBrandsError: getStateForKey('state.brands.list.error', state),
    followedBrands: Object.values(followedBrands),
    search: getStateForKey('state.brands.list.search', state),
  };
};

export default connect(mapStateToProps, null)(V);
