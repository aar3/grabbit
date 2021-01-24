import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest, httpStateUpdate} from 'grabbit/src/Utils';
import {LoadingView, ErrorView} from 'grabbit/src/components/Basic';
import {Color, Font, PLACEHOLDER_IMG} from 'grabbit/src/Const';
import DealFocusModal from 'grabbit/src/components/modals/DealFocus';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListReloading: false,
      infoModalVisible: false,
    };
  }

  componentDidMount() {
    this.getDeals();
    this.getMatchedDeals();
    this.getWatchList();
    this.getNotifications();
  }

  getDeals(page) {
    const p = page || this.props.dealsPage;
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/deals?page=${p}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetDeals',
    });
  }

  getMatchedDeals(page) {
    const p = page || this.props.matchedDealsPage;
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/deals?page=${p}`,
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

  getNotifications() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/notifications/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetNotifications',
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
          }}
          ref={(ref) => {
            this.horizontalFlatList = ref;
          }}
          onEndReachedThreshold={1}
          onEndReached={async () => {
            // FIXME: This gets fired when the number of matched deals is less than the number
            // of items it takes to make the list scrollable (the list is tricked into thinking
            // that the end has been reached even though no scroll has happened)
            const page = this.props.matchedDealsPage + 1;

            await this.getMatchedDeals(page);

            this.props.dispatch({
              type: ReduxActions.Deals.IncrementMatchedDealsPage,
              payload: page,
            });
          }}
          refreshing={this.props.getMatchedDealsPending}
          onRefresh={() => this.getMatchedDeals()}
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

  _renderWatchListIcon(item) {
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
          <Icon name="bookmark" size={20} color={Color.QueenBlue} />
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
        <Icon name="bookmark" size={20} color={Color.BorderLightGrey} />
      </TouchableOpacity>
    );
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

  _getFoobarItem() {
    const n = this.props.deals.length;
    if (n <= 10) {
      return 0;
    }

    let x;

    const rem = n % 10;
    if (rem === 0) {
      x = n - 11;
    } else {
      x = rem;
    }

    console.log(x, this.props.deals[x]);

    return {index: x, item: this.props.deals[x]};
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
          flex: 1,
          borderWidth: 1,
          borderColor: 'red',
          width: '100%',
          marginTop: 10,
          paddingBottom: 10,
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
          ref={(ref) => {
            this.verticalFlatList = ref;
          }}
          // FIX ME: need to get this working
          // onContentSizeChange={() => {
          //   const {index = 0, item} = this._getFoobarItem();
          //   console.log('>>> INDEX ', index);
          //   this.verticalFlatList.scrollToIndex({
          //     // viewOffset: 10,
          //     // viewPosition: 0.5,
          //     index,
          //     animated: true,
          //   });
          // }}
          onEndReachedThreshold={1}
          onEndReached={async () => {
            const page = this.props.dealsPage + 1;

            await this.getDeals(page);

            this.props.dispatch({
              type: ReduxActions.Deals.IncrementDealsPage,
              payload: page,
            });
          }}
          refreshing={this.props.getDealsPending}
          onRefresh={() => this.getDeals()}
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
                      {this._renderWatchListIcon(item)}
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
  const watchList = getStateForKey('state.deals.watch_list.list.items', state);
  const watchListIds = new Set(Object.values(watchList).map((item) => item.deal.id));

  // Tag on_watch_list to each deal for watch list icon rendering
  let deals = getStateForKey('state.deals.all.items', state);
  deals = Object.values(deals);
  deals = deals
    .map((item) => {
      if (watchListIds.has(item.id)) {
        item.is_on_watchlist = true;
      }
      return item;
    })
    .sort((a, b) => a.id > b.id);

  const matchedDeals = getStateForKey('state.deals.matches.items', state);

  return {
    user: getStateForKey('state.session.user', state),
    deals,
    getDealsPending: getStateForKey('state.deals.all.pending', state),
    getDealsError: getStateForKey('state.deals.all.error', state),
    matchedDeals: Object.values(matchedDeals),
    getMatchedDealsPending: getStateForKey('state.deals.matches.pending', state),
    getMatchedDealsError: getStateForKey('state.deals.matches.error', state),
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
    dealsPage: getStateForKey('state.deals.all.page', state),
    matchedDealsPage: getStateForKey('state.deals.matches.page', state),
  };
};

export default connect(mapStateToProps, null)(V);
