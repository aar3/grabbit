import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {DealListItem} from 'grabbit/src/components/List';
import {getStateForKey, httpStateUpdate} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';
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
            return (
              <TouchableOpacity
                // TODO: this should open deal focus modal, where the deal can be
                // removed from the watch list on that modal
                onPress={() =>
                  this.props.dispatch({
                    type: ReduxActions.Deals.SetFocusedDeal,
                    payload: item,
                  })
                }>
                <DealListItem item={item.deal} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const deals = Object.values(getStateForKey('state.deals.watch_list.list.items', state));
  return {
    user: getStateForKey('state.session.user', state),
    watchList: Object.values(deals),
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
  };
};

export default connect(mapStateToProps, null)(V);
