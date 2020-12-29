import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._options = {};
  }

  get options() {
    return {
      endpoint: `/user/${this.props.user.id}/rewards/`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  componentDidMount() {
    return this.props.getUserRewards(this.options);
  }

  render() {
    if (this.props.getRewardsPending) {
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

    if (this.props.getRewardsError) {
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
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Whoops, there was an error
          </Text>
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 10, color: Color.BorderLightGrey}}>
            {this.props.getRewardsError.details}
          </Text>
          <TouchableOpacity onPress={() => this.props.getUserRewards(this.options)}>
            <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.BorderLightGrey} />
          </TouchableOpacity>
          <Text style={{color: Color.BorderLightGrey}}>Try Again</Text>
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
          data={this.props.rewards}
          style={{
            width: '100%',
          }}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => this.props.focusReward(item)}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Color.BorderLightGrey,
                    height: 60,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      height: 40,
                      width: 40,
                      marginLeft: 20,
                      overflow: 'hidden',
                      borderRadius: 100,
                    }}>
                    <Image source={{uri: item.code.campaign.merchant.image_url}} style={{height: 40, width: 40}} />
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
                        fontSize: 11,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.code.description}
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
    rewards: getStateForKey('state.rewards.list.items', state),
    getRewardsPending: getStateForKey('state.rewards.list.pending', state),
    getRewardsError: getStateForKey('state.rewards.list.error', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    getUserRewards: async function (options) {
      dispatch({
        type: ReduxActions.Rewards.GetUserRewardsPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Rewards.GetUserRewardsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Rewards.GetUserRewardsSuccess,
        payload: data,
      });
    },

    focusReward: function (reward) {
      dispatch({
        type: ReduxActions.Rewards.SetFocusedReward,
        payload: reward,
      });

      return Actions.rewardFocus();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
