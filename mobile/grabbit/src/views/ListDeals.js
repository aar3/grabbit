import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest, httpStateUpdate} from 'grabbit/src/Utils';
import {LoadingView, ErrorView} from 'grabbit/src/components/Basic';
import {Color, Font, PLACEHOLDER_IMG} from 'grabbit/src/Const';
import DealFocusModal from 'grabbit/src/components/modals/DealFocus';
import {Error} from 'grabbit/src/components/Error';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListReloading: false,
      infoModalVisible: false,
    };
    this._options = {};
  }

  // componentDidMount() {
  //   this.getDeals();
  //   this.getMatchedDeals();
  //   this.getWatchList();
  // }

  getDeals() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/deals?page=1`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetDeals',
    });
  }

  getMatchedDeals() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/deals/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetMatchedDeals',
    });
  }

  getWatchList() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/watchlist/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetWatchList',
    });
  }

  _renderHorizontalFlatList() {
    if (this.props.getMatchedDealsPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            width: '90%',
          }}>
          <Text>Fetching stuff we found for you...</Text>
          <LoadingView
            style={{
              marginTop: 20,
              width: 50,
              height: 50,
            }}
          />
        </View>
      );
    }

    if (this.props.getMatchedDealsError) {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'green',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 275,
          }}>
          <ErrorView
            overrideMsg={'There was an issue getting your matches'}
            error={this.props.getMatchedDealsError}
            onTryAgain={() => this.getMatchedDeals()}
          />
        </View>
      );
    }

    if (this.props.matchedDeals.length === 0) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: Color.QueenBlue,
            height: 300,
          }}>
          <Text
            style={{
              color: Color.White,
              fontWeight: '500',
              fontSize: 24,
            }}>
            Welcome to Grabbit!
          </Text>
          <Text
            style={{
              color: Color.White,
              marginTop: 20,
              fontWeight: '500',
              fontSize: 14,
            }}>
            We haven't found any any deals for you yet.
          </Text>
          <Text
            style={{
              color: Color.White,
              marginTop: 20,
              fontWeight: '500',
              fontSize: 14,
            }}>
            In the mean time, check out what we have below.
          </Text>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: 50,
              width: 50,
              marginTop: 20,
            }}>
            <Image source={{uri: PLACEHOLDER_IMG}} style={{height: 50, width: 50}} />
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          width: '100%',
          height: 275,
          borderWidth: 1,
          borderColor: 'green',
        }}>
        <FlatList
          horizontal
          data={this.props.matchedDeals}
          style={{
            borderWidth: 1,
            borderColor: 'green',
            backgroundColor: Color.TopNavBackground,
            borderBottomWidth: 0,
            height: 275,
            width: '100%',
            // marginBottom: 2,
          }}
          refreshing={this.props.getMatchedDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const discount = Number(
              ((item.deal.original_value - item.deal.current_value) / item.deal.current_value) * 100,
            ).toFixed(0);

            const shortTitle = item.deal.title.length > 50 ? `${item.deal.title.substr(0, 50)}...` : item.deal.title;

            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.dispatch({
                    type: ReduxActions.Deals.SetFocusedDeal,
                    payload: item,
                  })
                }>
                <View
                  style={{
                    height: 250,
                    width: 250,
                    borderRadius: 5,
                    marginTop: 5,
                    backgroundColor: Color.White,
                    marginLeft: 10,
                    borderColor: Color.BorderLightGrey,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'red',
                        width: 250,
                        height: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: item.deal.img_url, cache: 'force-cache'}}
                        style={{
                          height: 248,
                          width: 248,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: Color.QueenBlue,
                        opacity: 0.7,
                        width: 200,
                        maxHeight: 60,
                        position: 'absolute',
                        bottom: 0,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 13,
                          textAlign: 'center',
                          color: Color.White,
                          fontWeight: '500',
                        }}>
                        {shortTitle}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  _renderModal() {
    const modal = <DealFocusModal childRef={(ref) => (this.childRef = ref)} />;
    if (!this.props.showDealFocusedModal) {
      return;
    }

    return modal;
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

  _renderVerticalFlatList() {
    if (this.props.getDealsPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            height: 400,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
          }}>
          <Text>Fetching other stuff you might like...</Text>
          <LoadingView
            style={{
              marginTop: 20,
              width: 50,
              height: 50,
            }}
          />
        </View>
      );
    }

    if (this.props.getDealsError) {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'blue',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 400,
          }}>
          <ErrorView
            overrideMsg={'There was an issue getting other deals'}
            error={this.props.getDealsError}
            onTryAgain={() => this.getDeals()}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'red',
          width: '100%',
          marginTop: 10,
        }}>
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
          refreshing={this.props.getMatchedDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const size = 90;
            const shortDescription =
              item.description.length > size ? `${item.description.substr(0, size)}...` : item.description;

            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.dispatch({
                    type: ReduxActions.Deals.SetFocusedDeal,
                    payload: item,
                  })
                }>
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
                          fontFamily: Font,
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
                        fontFamily: Font,
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
                        fontFamily: Font,
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
                      <TouchableOpacity>
                        <Icon
                          name="bookmark"
                          size={20}
                          color={item.is_on_watchlist ? Color.QueenBlue : Color.BorderLightGrey}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: Color.BorderLightGrey,
        }}>
        {this._renderModal()}
        {this._renderHorizontalFlatList()}
        {this._renderVerticalFlatList()}
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const deals = getStateForKey('state.deals.all.items', state);
  const matchedDeals = getStateForKey('state.deals.matches.items', state);

  return {
    user: getStateForKey('state.session.user', state),
    deals: Object.values(deals),
    getDealsPending: getStateForKey('state.deals.all.pending', state),
    getDealsError: getStateForKey('state.deals.all.error', state),
    matchedDeals: Object.values(matchedDeals),
    getMatchedDealsPending: getStateForKey('state.deals.matches.pending', state),
    getMatchedDealsError: getStateForKey('state.deals.matches.error', state),
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    // NOTE: Remove the pending state so it doesn't clash with default FlatList loading image
    refreshViaFlatList: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Deals.GetMatchedDealsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.GetMatchedDealsSuccess,
        payload: data,
      });
    },

    // getMatchedDeals: async function(options, prefix) {
    //   return httpStateUpdate(dispatch, options, prefix);
    // },

    getMatchedDeals: async function (options) {
      dispatch({
        type: ReduxActions.Deals.GetMatchedDealsPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Deals.GetMatchedDealsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.GetMatchedDealsSuccess,
        payload: data,
      });
    },

    setFocusedDeal: function (deal) {
      dispatch({
        type: ReduxActions.Deals.SetFocusedDeal,
        payload: deal,
      });

      // return Actions.rewardFocus();
    },
    postNewWatchListItem: async function (options) {
      dispatch({
        type: ReduxActions.Deals.UpdateWatchListItemPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        dispatch({
          type: ReduxActions.Deals.UpdateWatchListItemError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.UpdateWatchListItemSuccess,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, null)(V);
