import React from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList, View, Image} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {SearchBar} from 'react-native-elements';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color, FakeImage} from 'grabbit/src/const';
import {Actions} from 'react-native-router-flux';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      updateWalletViewSearchInput,
      clearWalletViewSearchInput,
      walletViewSearchInputValue,
      brands,
    } = this.props;

    const filteredBrands = !walletViewSearchInputValue
      ? brands
      : brands.filter((brandItem) => brandItem.name.startsWith(walletViewSearchInputValue));

    return (
      <View
        style={{
          flex: 1,
          // alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <View
            style={{
              width: 102,
              height: 102,
              borderWidth: 1,
              borderColor: Color.LightGrey,
            }}>
            <Image source={{uri: user.qr_code_url}} style={{height: 100, width: 100}} />
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              marginTop: 20,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchBar
              placeholder={'Search your wallet...'}
              containerStyle={{
                height: 40,
                width: '100%',
                backgroundColor: Color.White,
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                marginBottom: 20,
              }}
              inputContainerStyle={{
                height: 40,
                backgroundColor: Color.White,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: Color.LightGrey,
                borderBottomWidth: 1,
              }}
              inputStyle={{
                fontSize: 12,
                height: 40,
                color: Color.Black,
                // borderWidth: 1,
                // borderColor: Color.LightGrey,
              }}
              value={walletViewSearchInputValue}
              onChangeText={(text) => updateWalletViewSearchInput({text})}
              lightTheme={true}
              clearIcon={
                <TouchableOpacity onPress={() => clearWalletViewSearchInput()}>
                  <Icon name="x" size={20} color={Color.ReadableGreyText} />
                </TouchableOpacity>
              }
              searchIcon={
                <TouchableOpacity>
                  <Icon name="search" size={20} color={Color.ReadableGreyText} />
                </TouchableOpacity>
              }
            />
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                borderTopColor: Color.LightGrey,
                borderTopWidth: 1,
                width: '100%',
                marginTop: 40,
              }}>
              <FlatList
                style={
                  {
                    // borderWidth: 1,
                    // borderColor: 'green',
                  }
                }
                data={filteredBrands}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => Actions.brokerWalletEntryView()}>
                      <View
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'red',
                          width: '100%',
                          // alignItems: 'center',
                          height: 80,
                          flexDirection: 'row',
                          // flexGrow: 1,
                          alignItems: 'center',
                          padding: 10,
                          borderBottomColor: Color.LightGrey,
                          borderBottomWidth: 1,
                        }}>
                        <View
                          style={{
                            // borderWidth: 1,
                            // borderColor: 'black',
                            overflow: 'hidden',
                            borderRadius: 20,
                            width: 60,
                            height: 60,
                            marginLeft: 10,
                          }}>
                          <Image source={{uri: FakeImage}} style={{height: 60, width: 60}} />
                        </View>
                        <View
                          style={{
                            // borderWidth: 1,
                            // borderColor: 'red',
                            marginLeft: 20,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            // borderWidth: 1,
                            // borderColor: 'orange',
                            width: 40,
                            height: 40,
                            // marginLeft: 130,
                            position: 'absolute',
                            right: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 16,
                            }}>
                            ${item.amount}
                          </Text>
                        </View>
                        <Icon
                          style={{
                            marginLeft: 25,
                            position: 'absolute',
                            right: 10,
                          }}
                          name={'chevron-right'}
                          size={20}
                          color={Color.LightGrey}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {auth, wallet} = state;
  return {
    user: auth.user,
    walletViewSearchInputValue: wallet.currentSearchInput,
    brands: wallet.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWalletViewSearchInput: ({text}) => {
      return dispatch({
        type: REDUX_ACTIONS.UPDATE_BROKER_WALLET_VIEW_SEARCH_INPUT,
        payload: text,
      });
    },
    clearWalletViewSearchInput: () => {
      return dispatch({
        type: REDUX_ACTIONS.CLEAR_BROKER_WALLET_VIEW_SEARCH_INPUT,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);