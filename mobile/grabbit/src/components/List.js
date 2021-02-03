import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {httpStateUpdate, getStateForKey, objectContainsItem} from 'grabbit/src/lib/Utils';
import {Color} from 'grabbit/src/lib/Const';

class DealListItem_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLike: false,
      like: null,
      onWatchList: false,
      watchListItem: null,
    };
  }

  _renderLikeIcon(deal) {
    // NOTE: if we're on the watchList route we don't need like indicator
    if (this.props.routeKey === 'watchList') {
      return null;
    }

    if (this.props.hasLike) {
      return (
        <TouchableOpacity
          onPress={() => {
            return httpStateUpdate({
              dispatch: this.props.dispatch,
              options: {
                endpoint: `/users/${this.props.user.id}/likes/${this.props.like.id}/`,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'X-Session-Token': this.props.user.current_session_token,
                },
              },
              stateKeyPrefix: 'DeleteDealLike',
            });
          }}>
          <Icon name="heart" size={20} color={Color.OceanBlue} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          return httpStateUpdate({
            dispatch: this.props.dispatch,
            options: {
              endpoint: `/users/${this.props.user.id}/likes/`,
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'X-Session-Token': this.props.user.current_session_token,
              },
              data: {
                user_id: this.props.user.id,
                deal_id: deal.id,
              },
            },
            stateKeyPrefix: 'PostDealLike',
          });
        }}>
        <Icon name="heart-outline" size={20} color={Color.BorderLightGrey} />
      </TouchableOpacity>
    );
  }

  _renderWatchListIcon(deal) {
    // NOTE: if we're on the watchList route we don't need bookmark indicator
    if (this.props.routeKey === 'watchList') {
      return null;
    }

    if (this.props.onWatchList) {
      return (
        <TouchableOpacity
          onPress={() => {
            return httpStateUpdate({
              dispatch: this.props.dispatch,
              options: {
                endpoint: `/users/${this.props.user.id}/watchlist/${this.props.watchListItem.id}/`,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'X-Session-Token': this.props.user.current_session_token,
                },
              },
              stateKeyPrefix: 'DeleteFromWatchList',
            });
          }}>
          <Icon name="bookmark" size={20} color={Color.OceanBlue} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => {
          return httpStateUpdate({
            dispatch: this.props.dispatch,
            options: {
              endpoint: `/users/${this.props.user.id}/watchlist/`,
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'X-Session-Token': this.props.user.current_session_token,
              },
              data: {
                deal_id: deal.id,
                user_id: this.props.user.id,
              },
            },
            stateKeyPrefix: 'PostToWatchList',
          });
        }}>
        <Icon name="bookmark-outline" size={20} color={Color.BorderLightGrey} />
      </TouchableOpacity>
    );
  }

  render() {
    const deal = this.props.item.deal;
    const size = 90;
    const shortDescription =
      deal.description.length > size ? `${deal.description.substr(0, size)}...` : deal.description;

    return (
      <View
        style={{
          backgroundColor: Color.White,
          borderBottomWidth: 1,
          borderBottomColor: Color.BorderLightGrey,
          marginTop: 5,
          alignItems: 'center',
          padding: 10,
          backgroundColor: Color.White,
          flexDirection: 'row',
          height: 175,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.BorderLightGrey,
            backgroundColor: Color.White,
            height: 150,
            width: 150,
            overflow: 'hidden',
          }}>
          {/* <Image
              source={{uri: deal.img_url}}
              style={{
                height: 150,
                width: 150,
                // borderWidth: 1,
                // borderColor: 'red',
              }}
            /> */}
          <FlatList
            horizontal
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              width: '100%',
              height: '100%',
            }}
            keyExtractor={(_item, index) => index.toString()}
            data={deal.all_img_urls}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: Color.BorderLightGrey,
                    // backgroundColor: Color.White,
                    height: 145,
                    width: 145,
                    overflow: 'hidden',
                    marginRight: 5,
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      height: 150,
                      width: 150,
                      // borderWidth: 1,
                      // borderColor: 'red',
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.dispatch({
              type: ReduxActions.Deals.SetFocusedDeal,
              payload: deal,
            })
          }>
          <View
            style={{
              marginLeft: 10,
              width: 225,
              height: 150,
              justifyContent: 'center',
              // borderWidth: 1,
              // borderColor: 'blue',
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 13,

                  fontWeight: '500',
                  marginBottom: 5,
                  color: Color.LessReadableGreyText,
                }}>
                {deal.merchant_name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 50,
                  color: Color.ReadableGreyText,
                }}>
                ${deal.current_value}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.ErrorRed,
                  marginLeft: 20,
                  textDecorationLine: 'line-through',
                }}>
                ${deal.original_value}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                marginTop: 5,
                color: Color.ReadableGreyText,
                marginBottom: 10,
                color: Color.ReadableGreyText,
              }}>
              {deal.title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: Color.LessReadableGreyText,
              }}>
              {shortDescription}
            </Text>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 5,
              }}>
              {this._renderWatchListIcon(deal)}
              {this._renderLikeIcon(deal)}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    user: getStateForKey('state.session.user', state),
    likes: getStateForKey('state.deals.likes.list.items', state),
    watchList: getStateForKey('state.deals.watch_list.list.items', state),
  };
};

export const DealListItem = connect(mapStateToProps, null)(DealListItem_);
