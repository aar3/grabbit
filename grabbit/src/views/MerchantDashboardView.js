import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
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
  rewardTiers: [
    {
      id: '1',
      value: '0',
      usd: 5,
      points: 1000,
    },
    {
      id: '2',
      value: '1',
      usd: 10,
      points: 5000,
    },
    {
      id: '3',
      value: '3',
      usd: 25,
      points: 10000,
    },
    {
      id: '4',
      value: '4',
      usd: 100,
      points: 50000,
    },
  ],
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
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
          <Button type="outline" title="Add" />
        </View>
      </View>
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
