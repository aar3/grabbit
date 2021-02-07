import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {DealListItem} from 'grabbit/src/components/List';
import {EmptyFlatList} from 'grabbit/src/components/Basic';
import {getStateForKey, httpStateUpdate, objectContainsItem} from 'grabbit/src/lib/Utils';
import {Color} from 'grabbit/src/lib/Const';
import DealFocusModal from 'grabbit/src/components/modals/DealFocus';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getWatchList();
  }

  _renderModal() {
    const modal = <DealFocusModal childRef={(ref) => (this.childRef = ref)} />;
    if (!this.props.showDealFocusedModal) {
      return;
    }
    return modal;
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

  render() {
    if (this.props.watchList.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EmptyFlatList text="You haven't added anything to your Watch List" />
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
        {this._renderModal()}
        <FlatList
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            width: '100%',
          }}
          keyExtractor={(_item, index) => index.toString()}
          data={this.props.watchList}
          renderItem={({item, index}) => {
            // FIXME: we shouldn't have to copy/paste these properties into DealListItem
            const [hasLike, like] = objectContainsItem(this.props.likes, item.id);
            const [onWatchList, watchListItem] = objectContainsItem(this.props.watchListObject, item.id);

            return (
              <DealListItem
                hasLike={hasLike}
                like={like}
                onWatchList={onWatchList}
                watchListItem={watchListItem}
                item={item}
                routeKey="watchList"
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const watchListDeals = Object.values(getStateForKey('state.deals.watch_list.list.items', state));
  return {
    user: getStateForKey('state.session.user', state),
    watchList: Object.values(watchListDeals),
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
    likes: getStateForKey('state.deals.likes.list.items', state),
    watchListObject: watchListDeals,
  };
};

export default connect(mapStateToProps, null)(V);
