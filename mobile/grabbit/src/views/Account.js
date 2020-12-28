import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {GrabbitButton} from 'grabbit/src/components/Basic';
import {getStateForKey} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {inactiveRewards, stats} = this.props;
    const overviewSavings = Number(stats.total_spend * stats.avg_discount).toFixed(0);

    const overviewMsg =
      `You've saved $${overviewSavings} in the past ${stats.time_elapsed}s ` +
      ` days by using ${stats.conversions} out of ${stats.impressions} possible rewards from ` +
      `${stats.unique_merchants} different merchants`;

    const topMerchantSavings = Number(stats.top_merchant.total_spend * stats.top_merchant.avg_discount).toFixed(0);

    const topMerchantMsg =
      `Your top merchant has been ${stats.top_merchant.name}, having used ` +
      `${stats.top_merchant.conversions} for $${topMerchantSavings} in savings`;

    const missedSavings = Number(stats.missed_opportunities.total_spend * stats.missed_opportunities.avg_discount);

    const missedOpportunitiesMsg =
      `You've let ${stats.missed_opportunities.expiries} rewards ` +
      `expire in the past ${stats.missed_opportunities.time_elapsed} days, missing out on $${missedSavings} in rewards`;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <ImageBackground
          style={{
            width: '110%',
            height: 400,
            height: 450,
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
          }}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'blue',
              // height: 350,
              width: '80%',
              marginTop: 50,
            }}>
            <TouchableOpacity onPress={() => Actions.settings()}>
              <Icon
                style={{
                  position: 'absolute',
                  right: 0,
                }}
                name={'more-horizontal'}
                color={Color.White}
                size={24}
              />
            </TouchableOpacity>
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <GrabbitButton
                onPress={() => {
                  console.log('refreshing account info');
                }}
                _buttonStyle={{
                  backgroundColor: Color.White,
                }}
                titleStyle={{
                  color: Color.Purple,
                  fontWeight: 'bold',
                }}
                title="Refresh Account Info"
              />
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
            height: 400,
          }}>
          <FlatList
            data={inactiveRewards}
            style={{
              width: '100%',
            }}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
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
                      <Image source={{uri: item.merchant.image_url}} style={{height: 40, width: 40}} />
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
                          fontSize: 11,
                          color: Color.ReadableGreyText,
                        }}>
                        {item.description}
                      </Text>
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
  return {
    user: getStateForKey('state.user', state),
    inactiveRewards: getStateForKey('state.rewards.inactive', state),
    stats: getStateForKey('state.stats', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
