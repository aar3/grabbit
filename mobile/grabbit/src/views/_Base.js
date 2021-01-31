import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {getStateForKey, httpStateUpdate} from 'grabbit/src/lib/Utils';
import {Color} from 'grabbit/src/lib/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getBrands();
    this.getFollowedBrands();
  }

  getBrands() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/brands/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetBrands',
    });
  }

  getFollowedBrands() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/brands/`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetFollowedBrands',
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
        <Text>Base View</Text>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const brands = getStateForKey('state.brands.list.items', state);
  const followedBrands = getStateForKey('state.brands.following.items', state);

  return {
    brands: Object.values(brands),
    getBrandsPending: getStateForKey('state.brands.list.pending', state),
    getBrandsError: getStateForKey('state.brands.list.error', state),
    followedBrands: Object.values(followedBrands),
  };
};

export default connect(mapStateToProps, null)(V);
