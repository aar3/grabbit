import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {DealListItem} from 'grabbit/src/components/List';
import {getStateForKey, httpStateUpdate, objectContainsItem} from 'grabbit/src/lib/Utils';
import {LoadingView, ErrorView} from 'grabbit/src/components/Basic';
import {Color} from 'grabbit/src/lib/Const';
import DealFocusModal from 'grabbit/src/components/modals/DealFocus';
import Websocket from 'grabbit/src/lib/Websocket';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.ws = Websocket;
    this.state = {
      scrollOffset: null,
    };
  }

  componentDidMount() {
    // NOTE: We need to initialize the websoket after state.session.user is populated,
    // it doesn't matter where we initialize it really
    this.ws.initWithUser(this.props.user);
    this.getDeals();
    this.getMatchedDeals();
    this.getWatchList();
    this.getNotifications();
    this.getLikes();
  }

  getLikes() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/likes/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetUserLikes',
    });
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

  _renderVerticalFlatList() {
    if (this.props.getDealsPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 300,
          }}>
          <Text style={{color: Color.GreyBlue}}>Grabbing stuff you might like...</Text>
          <LoadingView
            style={{
              marginTop: 40,
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
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 200,
          }}>
          <ErrorView
            overrideMsg={'There seems to be an issue with getting your deals'}
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
          // borderWidth: 1,
          // borderColor: 'red',
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
            // backgroundColor: Color.TopNavBackground,
            borderTopWidth: 1,
            borderTopColor: Color.BorderLightGrey,
          }}
          ref={(ref) => {
            this.verticalFlatList = ref;
          }}
          onScroll={(event) => {
            const scrollOffset = event.nativeEvent.contentOffset.y;
            // console.log('>>> SCROLL INDEX ', scrollOffset);
            this.setState({scrollOffset});
          }}
          onEndReachedThreshold={0.7}
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
            // FIXME: we shouldn't have to copy/paste these properties into DealListItem
            const [hasLike, like] = objectContainsItem(this.props.likes, item.id);
            const [onWatchList, watchListItem] = objectContainsItem(this.props.watchList, item.id);
            return (
              <DealListItem
                index={index}
                hasLike={hasLike}
                like={like}
                watchListItem={watchListItem}
                onWatchList={onWatchList}
                item={{deal: item}}
              />
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
        }}>
        {this._renderModal()}
        {this._renderVerticalFlatList()}
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const deals = getStateForKey('state.deals.all.items', state);
  const sortedDeals = Object.values(deals).sort((a, b) => a.id > b.id);
  const matchedDeals = getStateForKey('state.deals.matches.items', state);

  return {
    user: getStateForKey('state.session.user', state),

    deals: sortedDeals,
    getDealsPending: getStateForKey('state.deals.all.pending', state),
    getDealsError: getStateForKey('state.deals.all.error', state),

    matchedDeals: Object.values(matchedDeals),
    getMatchedDealsPending: getStateForKey('state.deals.matches.pending', state),
    getMatchedDealsError: getStateForKey('state.deals.matches.error', state),

    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),

    dealsPage: getStateForKey('state.deals.all.page', state),
    matchedDealsPage: getStateForKey('state.deals.matches.page', state),

    likes: getStateForKey('state.deals.likes.list.items', state),
    watchList: getStateForKey('state.deals.watch_list.list.items', state),
  };
};

export default connect(mapStateToProps, null)(V);
