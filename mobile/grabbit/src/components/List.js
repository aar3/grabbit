import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {httpStateUpdate, getStateForKey} from 'grabbit/src/lib/Utils';
import {Color} from 'grabbit/src/lib/Const';

class DealListItem_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderWatchListIcon(item) {
    // NOTE: if we're on the watchList route we don't need bookmark indicator
    if (this.props.routeKey === 'watchList') {
      return null;
    }
    if (item.is_on_watchlist) {
      return (
        <TouchableOpacity
          onPress={() => {
            return httpStateUpdate({
              dispatch: this.props.dispatch,
              options: {
                endpoint: `/users/${this.props.user.id}/watchlist/${item.id}/`,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'X-Session-Token': this.props.user.current_session_token,
                },
              },
              stateKeyPrefix: 'PostToWatchList',
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
                deal_id: item.id,
                user_id: this.props.user.id,
              },
            },
            stateKeyPrefix: 'DeleteFromWatchList',
          });
        }}>
        <Icon name="bookmark-outline" size={20} color={Color.BorderLightGrey} />
      </TouchableOpacity>
    );
  }

  render() {
    const {item} = this.props;
    const size = 90;
    const shortDescription =
      item.description.length > size ? `${item.description.substr(0, size)}...` : item.description;

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
          <Image
            source={{uri: item.img_url}}
            style={{
              height: 150,
              width: 150,
              // borderWidth: 1,
              // borderColor: 'red',
            }}
          />
        </View>
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
              {item.merchant_name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 50,
                color: Color.ReadableGreyText,
              }}>
              ${item.current_value}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: Color.ErrorRed,
                marginLeft: 20,
                textDecorationLine: 'line-through',
              }}>
              ${item.original_value}
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
            {item.title}
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
              justifyContent: 'flex-end',
              marginTop: 5,
            }}>
            {this._renderWatchListIcon(item)}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    user: getStateForKey('state.session.user', state),
  };
};

export const DealListItem = connect(mapStateToProps, null)(DealListItem_);
