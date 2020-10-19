import React from 'react';
import {StyleSheet, ScrollView, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Svg, Path, Line} from 'react-native-svg';
import {Actions} from 'react-native-router-flux';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';
import {Color, FakeImage} from 'grabbit/src/const';

const data = {
  currentCampaignCode: {
    id: '1',
    name: 'Some title here',
    description: 'Some description here',
    code: 'H5MFSA',
    expiry: '8/12/2020',
  },
  campaignStats: [
    {
      id: '0',
      label: 'Posts',
      value: 23,
    },
    {
      id: '1',
      label: 'Impressions',
      value: 1002,
    },
    {
      id: '2',
      label: 'Engagement',
      value: 83,
    },
  ],
};

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentCampaignCode, campaignStats, rewardTiers} = this.props;
    const [posts, impressions, engagement] = campaignStats;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          paddingBottom: 30,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: 'red',
            width: '95%',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              marginTop: 20,
              // justifyContent: 'center',
              // alignItems: 'center',
              marginBottom: 20,
              width: '80%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 32,
                marginTop: 50,
              }}>
              {currentCampaignCode.code}
            </Text>
            <View
              style={{
                width: '100%',
                // borderWidth: 1,
                // borderColor: 'blue',
                marginTop: 50,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View style={styles.StatItem__Container}>
                <Text style={styles.StatItem__Label}>{posts.label}</Text>
                <Icon style={styles.StatsItem__Icon} name="users" size={15} color={Color.LightGrey} />
                <Text style={styles.StatItem__Value}>{posts.value.toLocaleString()}</Text>
              </View>
              <View style={styles.StatItem__Container}>
                <Text style={styles.StatItem__Label}>{impressions.label}</Text>
                <Icon style={styles.StatsItem__Icon} name="eye" size={15} color={Color.LightGrey} />
                <Text style={styles.StatItem__Value}>{impressions.value.toLocaleString()}</Text>
              </View>
              <View style={styles.StatItem__Container}>
                <Text style={styles.StatItem__Label}>{engagement.label}</Text>
                <Icon style={styles.StatsItem__Icon} name="trending-up" size={15} color={Color.LightGrey} />
                <Text style={styles.StatItem__Value}>{engagement.value.toLocaleString()}</Text>
              </View>
            </View>
            <Svg height="100" width="100">
              <Path
                // d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
                d="M15 100 L98 65 L70 25"
                fill="none"
                stroke="red"
              />
            </Svg>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: '100%',
                height: 40,
              }}>
              <TouchableOpacity onPress={() => Actions.merchantCampaignCodesView()}>
                <Text
                  style={{
                    position: 'absolute',
                    right: 10,
                    color: Color.HyperLink,
                    marginTop: 10,
                  }}>
                  View All Codes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <FlatList
            style={{
              borderTopWidth: 1,
              borderTopColor: Color.LightGrey,
              width: '90%',
            }}
            contentContainerStyle={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={rewardTiers}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    height: 90,
                    width: 350,
                    padding: 15,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    borderColor: Color.LightGrey,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginBottom: 10,
                      fontSize: 16,
                    }}>
                    {item.name}
                  </Text>
                  <Text>
                    ${item.usd} off when Grabbers reach {item.points.toLocaleString()}
                  </Text>
                </View>
              );
            }}
          /> */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {campaignCodes} = state;
  return {
    currentCampaignCode: data.currentCampaignCode,
    rewardTiers: data.rewardTiers,
    campaignStats: data.campaignStats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  StatItem__Container: {
    // borderWidth: 1,
    // borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  StatsItem__Icon: {
    marginBottom: 10,
  },
  StatItem__Label: {
    fontWeight: 'bold',
    color: Color.ReadableGreyText,
    marginBottom: 10,
  },
  StatItem__Value: {
    fontWeight: 'bold',
    color: Color.ReadableGreyText,
  },
});
