import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {getStateForKey} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'purple',
                  borderBottomWidth: 1,
                  borderBottomColor: Color.BorderLightGrey,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'green',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      overflow: 'hidden',
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: Color.BorderLightGrey,
                      height: 50,
                      width: 50,
                    }}>
                    <Image source={{uri: item.deal.img_url}} style={{height: 50, width: 50}} />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'black',
                      width: 300,
                      // height: 30,
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.ReadableGreyText,
                        fontWeight: '600',
                        marginBottom: 5,
                      }}>
                      {item.deal.merchant_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.deal.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'blue',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'red',
                    }}>
                    <Text
                      style={{
                        color: Color.ReadableGreyText,
                        fontSize: 12,
                      }}>
                      ${item.deal.current_value}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'green',
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        color: Color.ErrorRed,
                        textDecorationLine: 'line-through',
                        fontSize: 12,
                      }}>
                      ${item.deal.original_value}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const deals = Object.values(getStateForKey('state.deals.list.items', state));
  const watchList = deals.filter((item) => item.is_on_watchlist);
  return {
    user: getStateForKey('state.session.user', state),
    watchList,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
