import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {rewards} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={rewards}
          style={{
            width: '100%',
          }}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => Actions.rewardFocus()}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Color.BorderLightGrey,
                    height: 50,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'red',
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
                      borderWidth: 1,
                      height: 40,
                      width: '65%',
                      justifyContent: 'center',
                      borderColor: 'blue',
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.description}
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
  const rewards = getStateForKey('state.rewards.list', state);
  return {
    rewards,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    focusReward: function (reward) {
      return dispatch({
        type: ReduxActions.GENERIC_ACTION,
        payload: reward,
        operation: 'replace',
        stateKey: 'state.rewards.focused',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
