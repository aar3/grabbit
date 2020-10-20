import React from 'react';
import {Text, View, FlatList, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';
import {Color, FakeImage} from 'grabbit/src/const';

const data = {
  brands: [
    {
      id: '1',
      image_url: FakeImage,
      name: 'My Brand Number One',
      secret: 'AW27IE5FNAWIFNA424',
      description: 'This is a description of my super awesome brand',
    },
    {
      id: '2',
      image_url: FakeImage,
      name: 'My Brand #2',
      secret: 'AW27IE5FNAWIFNA424',
      description: 'This is a description of my super awesome brand',
    },
  ],
  rewardTiers: [
    {
      id: '1',
      name: 'Reward Tier 1',
      value: '0',
      usd: 5,
      points: 1000,
    },
    {
      id: '2',
      name: 'Reward Tier 2',
      value: '1',
      usd: 10,
      points: 5000,
    },
    {
      id: '3',
      name: 'Reward Tier 3',
      value: '3',
      usd: 25,
      points: 10000,
    },
    {
      id: '4',
      name: 'Reward Tier 4',
      value: '4',
      usd: 100,
      points: 50000,
    },
  ],
};

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {brands, rewardTiers} = this.props;
    console.log(brands);
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          alignItems: 'center',
        }}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.SectionHeader__Label}>My Brands</Text>
          <FlatList
            data={brands}
            style={{
              width: '90%',
              height: 225,
              marginBottom: 10,
              // borderWidth: 1,
              // borderColor: 'pink',
            }}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Color.LightGrey,
                    width: 350,
                    height: 75,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      height: 40,
                      marginLeft: 20,
                      width: 40,
                      overflow: 'hidden',
                      borderRadius: 100,
                    }}>
                    <Image source={{uri: item.image_url}} style={{height: 40, width: 40}} />
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'green',
                      marginLeft: 20,
                      padding: 5,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        marginBottom: 5,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: Color.LightGrey,
                        fontSize: 11,
                      }}>
                      Promo Secret: {item.secret}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity onPress={() => {}}>
            <Icon style={{marginTop: 10, marginBottom: 20}} name="plus-circle" size={25} color={Color.HyperLink} />
          </TouchableOpacity>
          <Text style={styles.SectionHeader__Label}>Instagram</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: Color.LightGrey,
              width: 350,
              height: 75,
              marginBottom: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                marginLeft: 20,
                padding: 5,
                justifyContent: 'center',
              }}>
              <Text>{'123'}</Text>
            </View>
          </View>
          <Text style={styles.SectionHeader__Label}>Rewards</Text>
          <FlatList
            style={{
              borderTopWidth: 1,
              borderTopColor: Color.LightGrey,
              width: '90%',
              height: 400,
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
          />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  const {session} = state;
  return {
    brands: data.brands,
    rewardTiers: data.rewardTiers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  SectionHeader__Label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
});
