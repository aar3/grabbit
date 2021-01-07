import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';
import {Reward} from 'grabbit/src/Models';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListReloading: false,
    };
    this._options = {};
  }

  get options() {
    return {
      endpoint: `/users/${this.props.user.id}/deals/`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  async componentDidMount() {
    return this.props.getUserDeals(this.options);
  }

  _renderExpiryTag(item) {
    const reward = new Reward(item);
    if (reward.expired()) {
      return (
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            color: Color.ErrorRed,
          }}>
          Expired {item.data.expiry.substr(0, 10)}
        </Text>
      );
    }
    return (
      <Text
        style={{
          marginTop: 10,
          fontSize: 12,
          color: Color.ReadableGreyText,
        }}>
        Expires {item.data.expiry.substr(0, 10)}
      </Text>
    );
  }

  _onRefresh() {
    return this.props.refreshViaFlatList(this.options);
  }

  render() {
    if (this.props.getDealsPending && !this.state.flatListReloading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: Color.BorderLightGrey}}>Loading Rewards</Text>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              marginTop: 20,
              // borderWidth: 1,
              // borderColor: 'red',
              height: 50,
              width: 50,
            }}></ImageBackground>
        </View>
      );
    }

    if (this.props.getDealsError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.Purple,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Whoops, there was an error
          </Text>
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 10, color: Color.BorderLightGrey}}>
            {this.props.getDealsError.details}
          </Text>
          <TouchableOpacity onPress={() => this.props.getUserDeals(this.options)}>
            <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.BorderLightGrey} />
          </TouchableOpacity>
          <Text style={{color: Color.BorderLightGrey}}>Try Again</Text>
        </View>
      );
    }

    if (this.props.deals.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.Purple,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Welcome to Grabbit!
          </Text>
          <Text
            style={{
              color: Color.BorderLightGrey,
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            You don't have any deals yet
          </Text>
          <Text
            style={{
              color: Color.BorderLightGrey,
              marginTop: 10,
              fontSize: 14,
            }}>
            Link an account to get started
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={this.props.deals}
          style={{
            width: '100%',
          }}
          refreshing={this.props.getDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    backgroundColor: Color.White,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.BorderLightGrey,
                    height: 60,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: Color.BorderLightGrey,
                      height: 40,
                      width: 40,
                      marginLeft: 20,
                      overflow: 'hidden',
                      borderRadius: 100,
                    }}>
                    <Image source={{uri: item.deal.img_url}} style={{height: 40, width: 40}} />
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      height: 40,
                      width: '65%',
                      justifyContent: 'center',
                      // borderWidth: 1,
                      // borderColor: 'blue',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.deal.description}
                    </Text>
                    {/* {this._renderExpiryTag(item)} */}
                  </View>
                  <Icon style={{marginLeft: 20}} name={'chevron-right'} size={20} color={Color.BorderLightGrey} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    user: getStateForKey('state.session.user', state),
    deals: getStateForKey('state.deals.list.items', state),
    getDealsPending: getStateForKey('state.deals.list.pending', state),
    getDealsError: getStateForKey('state.deals.list.error', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    // NOTE: Remove the pending state so it doesn't clash with default FlatList loading image
    refreshViaFlatList: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Deals.GetUserDealsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.GetUserDealsSuccess,
        payload: data,
      });
    },

    getUserDeals: async function (options) {
      dispatch({
        type: ReduxActions.Deals.GetUserDealsPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Deals.GetUserDealsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.GetUserDealsSuccess,
        payload: data,
      });
    },

    focusReward: function (deal) {
      dispatch({
        type: ReduxActions.Deals.SetFocusedDeal,
        payload: deal,
      });

      return Actions.rewardFocus();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
