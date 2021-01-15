import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest, formatOriginalPrice} from 'grabbit/src/Utils';
import {Color, Font} from 'grabbit/src/Const';
import {Error} from 'grabbit/src/components/FlatList';

const titleStyle = {
  fontWeight: '400',
  fontSize: 18,
  marginTop: 10,
  fontFamily: Font,
  textTransform: 'uppercase',
  marginLeft: 20,
  marginBottom: 10,
};

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
      return <Error error={this.props.getDealsError} onTryAgain={() => this.props.getUserDeals(this.options)} />;
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
              color: Color.Black,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Welcome to Grabbit!
          </Text>
          <Text
            style={{
              color: Color.LessReadableGreyText,
              marginTop: 5,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            You don't have any deals yet
          </Text>
          <Text
            style={{
              color: Color.LessReadableGreyText,
              marginTop: 10,
              fontSize: 12,
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
          alignItems: 'center',
        }}>
        {/* <Text style={titleStyle}>Featured</Text> */}
        <FlatList
          horizontal
          data={this.props.deals}
          style={{
            borderWidth: 1,
            backgroundColor: Color.TopNavBackground,
            borderColor: Color.BorderLightGrey,
            borderBottomWidth: 0,
            maxHeight: 240,
            width: '100%',
          }}
          refreshing={this.props.getDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const discount = Number(
              ((item.deal.original_value - item.deal.current_value) / item.deal.current_value) * 100,
            ).toFixed(0);
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log('cliked');
                }}>
                <View
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 5,
                    marginTop: 20,
                    backgroundColor: Color.White,
                    marginLeft: 10,
                    borderColor: Color.BorderLightGrey,
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={
                        {
                          // borderWidth: 1,
                          // borderColor: 'red',
                        }
                      }>
                      <View
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'red',
                          width: 150,
                          fontWeight: '600',
                          position: 'relative',
                          top: 10,
                          left: -10,
                          zIndex: 999,
                          color: Color.ReadableGreyText,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: Color.ReadableGreyText,
                          }}>
                          {item.deal.title}
                        </Text>
                      </View>
                      <Image
                        source={{uri: item.deal.img_url, cache: 'force-cache'}}
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'blue',
                          height: 145,
                          width: 145,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: Color.White,
                      borderColor: Color.BorderLightGrey,
                      opacity: 0.8,
                      // borderColor: 'green',
                      // borderWidth: 1,
                      height: 30,
                      position: 'absolute',
                      top: 170,
                      shadowColor: '#000',
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8,
                      backgroundColor: '#5c903f',
                      shadowOffset: {
                        width: 2,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4.84,
                      elevation: 5,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 8,
                        height: 30,
                        marginLeft: 10,
                        // borderWidth: 1,
                        // borderColor: 'green',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontFamily: Font,
                          fontSize: 14,
                          color: Color.White,
                        }}>
                        ${Number(item.deal.current_value).toFixed(0)}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Color.HotPink,
                        padding: 5,
                        height: 30,
                        marginLeft: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: Font,
                          color: Color.White,
                        }}>
                        ${Number(item.deal.original_value).toFixed(0)}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Color.QueenBlue,
                        padding: 5,
                        height: 30,
                        borderTopRightRadius: 8,
                        // marginLeft: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          fontFamily: Font,
                          color: Color.White,
                        }}>
                        {discount}%
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* <Text style={[
          titleStyle,
          {
            marginBottom: 20
          }]}>Other things you might like</Text> */}
        <FlatList
          data={this.props.deals}
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            width: '100%',
            backgroundColor: Color.TopNavBackground,
            borderTopWidth: 1,
            borderTopColor: Color.BorderLightGrey,
          }}
          refreshing={this.props.getDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const size = 90;
            const shortDescription =
              item.deal.description.length > size
                ? `${item.deal.description.substr(0, size)}...`
                : item.deal.description;
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log('clicked');
                }}>
                <View
                  style={{
                    backgroundColor: Color.White,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.BorderLightGrey,
                    marginBottom: 10,
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.White,
                    flexDirection: 'row',
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: Color.BorderLightGrey,
                      backgroundColor: Color.White,
                      height: 70,
                      width: 70,
                      marginLeft: 10,
                      overflow: 'hidden',
                      borderRadius: 10,
                    }}>
                    <Image source={{uri: item.deal.img_url}} style={{height: 60, width: 60}} />
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      width: '65%',
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
                          fontFamily: Font,
                          fontWeight: '500',
                          marginBottom: 5,
                          color: Color.LessReadableGreyText,
                        }}>
                        {item.deal.merchant_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          position: 'absolute',
                          right: 60,
                          // color: '#5c903f',
                          color: Color.ReadableGreyText,
                        }}>
                        {item.deal.current_value}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          position: 'absolute',
                          right: 10,
                          color: Color.ErrorRed,
                          textDecorationLine: 'line-through',
                        }}>
                        {item.deal.original_value}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Font,
                        fontWeight: '500',
                        marginTop: 5,
                        color: Color.ReadableGreyText,
                        marginBottom: 10,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.deal.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: Font,
                        color: Color.LessReadableGreyText,
                      }}>
                      {shortDescription}
                    </Text>
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
