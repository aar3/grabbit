import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {LoadingView, ErrorView, EmptyFlatList} from 'grabbit/src/components/Basic';
import {DealListItem} from 'grabbit/src/components/List';
import ReduxActions from 'grabbit/src/lib/Actions';
import {Color} from 'grabbit/src/lib/Const';
import {getStateForKey, httpStateUpdate, objectContainsItem} from 'grabbit/src/lib/Utils';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    return this.getMatchedDeals();
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

  render() {
    if (this.props.getMatchedDealsPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 300,
          }}>
          <Text style={{color: Color.GreyBlue}}>Grabbing deals we think you might like..</Text>
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

    if (this.props.getMatchedDealsError) {
      console.log(this.props.getMatchedDealsError);
      return (
        <View
          style={{
            flex: 1,
            //   borderWidth: 1,
            //   borderColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ErrorView
            style={{
              width: 300,
            }}
            overrideMsg={'There seems to be an issue with getting your matched deals'}
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EmptyFlatList text="We haven't found anything we think you'll really like yet" />
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
          style={{
            width: '100%',
          }}
          onRefresh={() => this.getMatchedDeals()}
          refreshing={this.props.getMatchedDealsPending}
          data={this.props.matchedDeals}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            // FIXME: we shouldn't have to copy/paste these properties into DealListItem
            const [hasLike, like] = objectContainsItem(this.props.likes, item.deal.id);
            const [onWatchList, watchListItem] = objectContainsItem(this.props.watchList, item.deal.id);
            return (
              <DealListItem
                item={item}
                routeKey="matchedDeals"
                hasLike={hasLike}
                like={like}
                watchListItem={watchListItem}
                onWatchList={onWatchList}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const matchedDeals = getStateForKey('state.deals.matches.items', state);
  return {
    user: getStateForKey('state.session.user', state),
    getMatchedDealsPending: getStateForKey('state.deals.matches.pending', state),
    getMatchedDealsError: getStateForKey('state.deals.matches.error', state),
    matchedDeals: Object.values(matchedDeals),
    likes: getStateForKey('state.deals.likes.list.items', state),
    watchList: getStateForKey('state.deals.watch_list.list.items', state),
  };
};

export default connect(mapStateToProps, null)(V);
