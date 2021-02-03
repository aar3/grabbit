import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {LoadingView, ErrorView} from 'grabbit/src/components/Basic';
import {DealListItem} from 'grabbit/src/components/List';
import ReduxActions from 'grabbit/src/lib/Actions';
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
            // FIXME: this can be abstracted a bit more (unfortunately)
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
