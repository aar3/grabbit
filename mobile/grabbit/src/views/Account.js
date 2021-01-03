import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {GrabbitButton} from 'grabbit/src/components/Basic';
import {Reward} from 'grabbit/src/Models';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    return this.props.getUserStats(this.options);
  }

  get options() {
    return {
      endpoint: `/user/${this.props.user.id}/stats/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  _renderExpiryTag(reward) {
    if (reward.expired()) {
      return (
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            color: Color.ErrorRed,
          }}>
          Expired {reward.data.expiry.substr(0, 10)}
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
        Redeemed {reward.data.redeemed_at.substr(0, 10)}
      </Text>
    );
  }

  _renderStatsHeaderContent() {
    const {stats} = this.props;

    if (this.props.getUserStatsPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: Color.White,
            }}>
            Loading stats...
          </Text>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              marginTop: 20,
              height: 50,
              width: 50,
              marginBottom: 20,
            }}></ImageBackground>
        </View>
      );
    }

    if (this.props.getUserStatsError) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: Color.White,
            }}>
            Doh, looks like there was an error
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: Color.White,
            }}>
            {this.props.getUserStatsError.details}
          </Text>
          <TouchableOpacity onPress={() => this.props.getUserStats(this.options)}>
            <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.White} />
          </TouchableOpacity>
          <Text style={{color: Color.White}}>Try Again</Text>
        </View>
      );
    }

    const overviewSavings = Number(stats.total_spend * stats.avg_discount).toFixed(0);

    const overviewMsg =
      `You've saved $${overviewSavings} in the past ${stats.time_elapsed} ` +
      ` days by using ${stats.conversions} out of ${stats.impressions} possible rewards from ` +
      `${stats.unique_merchants} different merchants`;

    const topMerchantSavings = Number(stats.top_merchant.total_spend * stats.top_merchant.avg_discount).toFixed(0);

    const topMerchantMsg =
      `Your top merchant has been ${stats.top_merchant.name}, having used ` +
      `${stats.top_merchant.conversions} reward for $${topMerchantSavings} in savings`;

    const missedSavings = Number(stats.missed_opportunities.potential_spend * stats.missed_opportunities.avg_discount);

    const missedOpportunitiesMsg =
      `You've let ${stats.missed_opportunities.expiries} rewards ` +
      `expire in the past ${stats.missed_opportunities.time_elapsed} days, missing out on $${missedSavings} in rewards`;

    return (
      <View
        style={{
          // borderWidth: 1,
          // borderColor: 'blue',
          width: '80%',
        }}>
        <Text
          style={{
            marginTop: 30,
            color: Color.White,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {overviewMsg}
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: Color.White,
            fontSize: 18,
          }}>
          {topMerchantMsg}
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: Color.White,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {missedOpportunitiesMsg}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          // borderColor: 'blue',
          // borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ImageBackground
          style={{
            width: '110%',
            height: 320,
            padding: 10,
            // overflow: 'hidden',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            zIndex: 1,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          {this._renderStatsHeaderContent()}
        </ImageBackground>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
            height: 400,
          }}>
          <FlatList
            data={this.props.inactiveRewards}
            style={{
              width: '100%',
            }}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: Color.White,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.BorderLightGrey,
                      height: 80,
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
                      <Image
                        source={{uri: item.data.code.campaign.merchant.image_url}}
                        style={{height: 40, width: 40}}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 20,
                        height: 40,
                        width: '65%',
                        justifyContent: 'center',
                        // borderColor: 'blue',
                        // borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: Color.ReadableGreyText,
                        }}>
                        {item.data.code.description}
                      </Text>
                      {this._renderExpiryTag(item)}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const rewards = getStateForKey('state.rewards.list.items', state).map((item) => new Reward(item));
  const inactiveRewards = rewards.filter((reward) => reward.inactive());
  return {
    user: getStateForKey('state.session.user', state),
    inactiveRewards,
    stats: getStateForKey('state.stats', state),
    getUserStatsPending: getStateForKey('state.stats.pending', state),
    getUserStatsError: getStateForKey('state.stats.error', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    getUserStats: async function (options) {
      dispatch({
        type: ReduxActions.Stats.GetUserStatsPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        return dispatch({
          type: ReduxActions.Stats.GetUserStatsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Stats.GetUserStatsSuccess,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
