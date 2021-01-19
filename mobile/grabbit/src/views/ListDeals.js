import React from 'react';
import {View, Text, FlatList, Image, Modal, TouchableOpacity, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {Color, Font} from 'grabbit/src/Const';
import DealFocusModal from 'grabbit/src/components/modals/DealFocus';
import {Error} from 'grabbit/src/components/FlatList';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListReloading: false,
      infoModalVisible: false,
    };
    this._options = {};
  }

  get options() {
    return {
      endpoint: `/users/${this.props.user.id}/deals/`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  async componentDidMount() {
    return this.props.getUserDeals(this.options);
  }

  _renderModal() {
    const modal = <DealFocusModal childRef={(ref) => (this.childRef = ref)} />;
    if (!this.props.showDealFocusedModal) {
      return;
    }

    return modal;
  }

  _renderExpiryTag(item) {
    const reward = new Reward(item);
    if (reward.expired()) {
      return (
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            color: Color.ErrorRed,
          }}>
          Expired {item.data.expiry.substr(0, 10)}
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
        Expires {item.data.expiry.substr(0, 10)}
      </Text>
    );
  }

  _onRefresh() {
    return this.props.refreshViaFlatList(this.options);
  }

  render() {
    if (this.props.getDealsPending && !this.state.flatListReloading) {
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

    if (this.props.getDealsError) {
      return <Error error={this.props.getDealsError} onTryAgain={() => this.props.getUserDeals(this.options)} />;
    }

    if (this.props.deals.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.Black,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Welcome to Grabbit!
          </Text>
          <Text
            style={{
              color: Color.LessReadableGreyText,
              marginTop: 5,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            You don't have any deals yet
          </Text>
          <Text
            style={{
              color: Color.LessReadableGreyText,
              marginTop: 10,
              fontSize: 12,
            }}>
            Link an account to get started
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: Color.BorderLightGrey,
        }}>
        {this._renderModal()}
        <FlatList
          horizontal
          data={this.props.deals}
          style={{
            borderWidth: 1,
            backgroundColor: Color.TopNavBackground,
            borderColor: 'green',
            borderBottomWidth: 0,
            height: 400,
            width: '100%',
            marginBottom: 2,
            // borderWidth: 1,
            // borderColor: 'red',
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 5,
            //   height: 10,
            // },
            // shadowOpacity: 0.9,
            // shadowRadius: 50.84,
            // elevation: 10,
          }}
          refreshing={this.props.getDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const discount = Number(
              ((item.deal.original_value - item.deal.current_value) / item.deal.current_value) * 100,
            ).toFixed(0);

            const shortTitle = item.deal.title.length > 50 ? `${item.deal.title.substr(0, 50)}...` : item.deal.title;

            return (
              <TouchableOpacity onPress={() => this.props.setFocusedDeal(item)}>
                <View
                  style={{
                    height: 250,
                    width: 250,
                    borderRadius: 5,
                    marginTop: 5,
                    // marginBottom: 40,
                    backgroundColor: Color.White,
                    marginLeft: 20,
                    borderColor: Color.BorderLightGrey,
                    borderWidth: 1,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: -2,
                      height: 2,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 5.84,
                    elevation: 5,
                  }}>
                  {/* <Modal 
                      animationType={'fade'}
                      transparent={true}
                      visible={this.state.infoModalVisible}
                      onRequestClose={() => {
                        this.setState({ infoModalVisible: false });
                      }}
                      >
                        <View style={{
                          height: 250,
                          width: 250,
                        }}>
                          <Text>Hi</Text>
                        </View>
                      </Modal> */}
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'red',
                        width: 250,
                        height: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: item.deal.img_url, cache: 'force-cache'}}
                        style={{
                          // borderWidth: 1,
                          // borderColor: Color.BorderLightGrey,
                          // borderRadius: 10,
                          height: 250,
                          width: 250,
                        }}
                      />
                    </View>
                    {/* <View style={{
                      width: 200,
                      height: 20,
                      marginTop: 10,
                      // borderWidth: 1,
                      // borderColor: 'green',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                      <Icon name={'heart'} size={20} color={Color.BorderLightGrey}/>
                      <Icon name={'bookmark'} size={20} color={Color.BorderLightGrey} />
                    </View> */}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: Color.BorderLightGrey,
          }}></View>

        <FlatList
          data={this.props.deals}
          style={{
            // borderWidth: 1,
            // borderColor: 'blue',
            width: '100%',
            backgroundColor: Color.TopNavBackground,
            borderTopWidth: 1,
            borderTopColor: Color.BorderLightGrey,
          }}
          refreshing={this.props.getDealsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            const size = 90;
            const shortDescription =
              item.deal.description.length > size
                ? `${item.deal.description.substr(0, size)}...`
                : item.deal.description;
            return (
              <TouchableOpacity onPress={() => this.props.setFocusedDeal(item)}>
                <View
                  style={{
                    backgroundColor: Color.White,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.BorderLightGrey,
                    // marginBottom: 10,
                    marginTop: 5,
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.White,
                    flexDirection: 'row',
                    // borderBottomRightRadius: 10,
                    // borderTopRightRadius: 10,
                    // shadowColor: '#000',
                    // shadowOffset: {
                    //   width: 2,
                    //   height: 2,
                    // },
                    // shadowOpacity: 0.5,
                    // shadowRadius: 5.84,
                    // elevation: 5,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: Color.BorderLightGrey,
                      backgroundColor: Color.White,
                      height: 150,
                      width: 150,
                      // marginLeft: 5,
                      overflow: 'hidden',
                      // borderRadius: 10,
                    }}>
                    <Image
                      source={{uri: item.deal.img_url}}
                      style={{
                        height: 150,
                        width: 150,
                        // borderWidth: 1,
                        // borderColor: 'red',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      width: 225,
                      height: 150,
                      justifyContent: 'center',
                      // borderWidth: 1,
                      // borderColor: 'blue',
                    }}>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'green',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: Font,
                          fontWeight: '500',
                          marginBottom: 5,
                          color: Color.LessReadableGreyText,
                        }}>
                        {item.deal.merchant_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          // position: 'absolute',
                          // right: 80,
                          // color: '#5c903f',
                          marginLeft: 50,
                          color: Color.ReadableGreyText,
                        }}>
                        ${item.deal.current_value}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          // position: 'absolute',
                          // right: 10,
                          color: Color.ErrorRed,
                          marginLeft: 20,
                          textDecorationLine: 'line-through',
                        }}>
                        ${item.deal.original_value}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Font,
                        fontWeight: '500',
                        marginTop: 5,
                        color: Color.ReadableGreyText,
                        marginBottom: 10,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.deal.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: Font,
                        color: Color.LessReadableGreyText,
                      }}>
                      {shortDescription}
                    </Text>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'green',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 5,
                      }}>
                      <TouchableOpacity onPress={() => {}}>
                        <Icon name="bookmark" size={20} color={Color.BorderLightGrey} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <Icon style={{marginLeft: 0}} name={'chevron-right'} size={20} color={Color.BorderLightGrey} /> */}
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
    deals: getStateForKey('state.deals.list.items', state),
    getDealsPending: getStateForKey('state.deals.list.pending', state),
    getDealsError: getStateForKey('state.deals.list.error', state),
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    // NOTE: Remove the pending state so it doesn't clash with default FlatList loading image
    refreshViaFlatList: async function (options) {
      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Deals.GetUserDealsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.GetUserDealsSuccess,
        payload: data,
      });
    },

    getUserDeals: async function (options) {
      dispatch({
        type: ReduxActions.Deals.GetUserDealsPending,
      });

      const {data, error} = await httpRequest(options);
      if (error) {
        return dispatch({
          type: ReduxActions.Deals.GetUserDealsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.GetUserDealsSuccess,
        payload: data,
      });
    },

    setFocusedDeal: function (deal) {
      dispatch({
        type: ReduxActions.Deals.SetFocusedDeal,
        payload: deal,
      });

      // return Actions.rewardFocus();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
