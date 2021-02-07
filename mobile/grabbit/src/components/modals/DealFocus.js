import React from 'react';
import {View, Modal, TouchableOpacity, ScrollView, Image, Linking, Text, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {Color, MerchantLogos, DealType} from 'grabbit/src/lib/Const';
import {GrabbitButton} from 'grabbit/src/components/Basic';
import {getStateForKey, getDealType, httpStateUpdate} from 'grabbit/src/lib/Utils';

class M extends React.Component {
  constructor(props) {
    super(props);
  }

  show() {
    return this.props.dispatch({
      type: ReduxActions.Deals.ToggleFocusedDealModal,
    });
  }

  hide() {
    return this.props.dispatch({
      type: ReduxActions.Deals.ToggleFocusedDealModal,
    });
  }

  _renderWatchListButton() {
    if (this.props.type === DealType.WatchList || this.props.type === DealType.DerivedWatchList) {
      return (
        <GrabbitButton
          onPress={() => {
            return httpStateUpdate({
              dispatch: this.props.dispatch,
              options: {
                // FIXME: We have to decide how we're removing from watchlist
                endpoint: `/users/${this.props.user.id}/watchlist/${this.props.deal.id}/`,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'X-Session-Token': this.props.user.current_session_token,
                },
              },
              stateKeyPrefix: 'PostToWatchList',
            });
          }}
          _buttonStyle={{
            backgroundColor: Color.White,
            borderColor: this.props.deal.brand.color_code,
            borderWidth: 1,
          }}
          titleStyle={{
            color: this.props.deal.brand.color_code,
            fontWeight: 'bold',
          }}
          title="Remove from Watch List"
        />
      );
    }

    if (this.props.type !== DealType.WatchList) {
      return (
        <GrabbitButton
          onPress={() => {
            return httpStateUpdate({
              dispatch: this.props.dispatch,
              options: {
                endpoint: `/users/${this.props.user.id}/watchlist/`,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'X-Session-Token': this.props.user.current_session_token,
                },
              },
              stateKeyPrefix: 'PostToWatchList',
            });
          }}
          _buttonStyle={{
            backgroundColor: this.props.deal.brand.color_code,
            // borderColor: Color.OceanBlue,
            // borderWidth: 1,
          }}
          titleStyle={{
            color: Color.White,
            fontWeight: 'bold',
          }}
          title="Add to Watch List"
        />
      );
    }
  }

  render() {
    const merchantLogo = MerchantLogos[this.props.deal.merchant_name];

    return (
      <Modal
        animationType={'slid'}
        transparent={true}
        visible={this.props.showDealFocusedModal}
        onRequestClose={() => {
          console.log('modal closed');
          this.props.dispatch({
            type: ReduxActions.Deals.ToggleFocusedDealModal,
          });
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: 50,
            marginBottom: 40,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 5,
              height: 10,
            },
            shadowOpacity: 0.9,
            shadowRadius: 50.84,
            elevation: 10,
          }}>
          <View
            style={{
              position: 'absolute',
              // borderWidth: 1,
              // borderColor: 'red',
              padding: 10,
              paddingTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                height: 30,
                position: 'absolute',
                top: 5,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.dispatch({
                    type: ReduxActions.Deals.CloseFocusedDealModal,
                  });
                }}>
                <Icon name="x" size={30} color={Color.BorderLightGrey} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: this.props.deal.brand.color_code,
                height: 100,
                width: 100,
                borderRadius: 100,
                marginTop: 10,
                overflow: 'hidden',
              }}>
              <Image source={{uri: this.props.deal.brand.img_url}} style={{width: 100, height: 100}} />
            </View>
            <Text
              style={{
                marginTop: 10,
                fontWeight: '600',
                fontSize: 16,
                color: Color.ReadableGreyText,
              }}>
              {this.props.deal.merchant_name}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: Color.ReadableGreyText,
              }}>
              {this.props.deal.title}
            </Text>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                width: 200,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  color: Color.OceanBlue,
                  fontSize: 16,
                }}>
                ${this.props.deal.current_value}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  color: Color.ErrorRed,
                  fontSize: 16,
                  textDecorationLine: 'line-through',
                }}>
                ${this.props.deal.original_value}
              </Text>
            </View>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                marginTop: 20,
                width: '100%',
                height: 300,
              }}>
              <FlatList
                horizontal
                keyExtractor={(_item, index) => index.toString()}
                style={{
                  height: 300,
                }}
                data={this.props.deal.all_img_urls}
                renderItem={({item, index}) => {
                  return (
                    <Image
                      source={{uri: item}}
                      style={{
                        height: 300,
                        width: 300,
                        borderWidth: 1,
                        borderColor: Color.BorderLightGrey,
                        marginLeft: 5,
                      }}
                    />
                  );
                }}
              />
            </View>

            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: '100%',
                padding: 5,
                maxHeight: 100,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <ScrollView>
                <Text
                  style={{
                    color: Color.ReadableGreyText,
                    fontSize: 12,
                    // textAlign: 'center',
                  }}>
                  {this.props.deal.description}
                </Text>
              </ScrollView>
            </View>

            <View
              style={
                {
                  // borderWidth: 1,
                  // borderColor: 'green',
                }
              }>
              {this._renderWatchListButton()}
              <GrabbitButton
                onPress={() => Linking.openURL(this.props.deal.url)}
                _buttonStyle={{
                  backgroundColor: Color.White,
                  borderColor: this.props.deal.brand.color_code,
                  borderWidth: 1,
                }}
                titleStyle={{
                  color: this.props.deal.brand.color_code,
                  fontWeight: 'bold',
                }}
                title="Visit"
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = function (state) {
  const item = getStateForKey('state.deals.focused.item', state);
  const type = getDealType(item);
  // const deal = [DealType.DerivedWatchList, DealType.Deal].includes(type) ? item : item.deal;

  return {
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
    deal: item.deal,
    type,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    toggleFocusedDealModal: () => {
      return;
    },
    putUserDealOnWatchList: async function (options) {
      dispatch({
        type: ReduxActions.Deals.UpdateWatchListItemPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        dispatch({
          type: ReduxActions.Deals.UpdateWatchListItemError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Deals.UpdateWatchListItemSuccess,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, null)(M);

const styles = StyleSheet.create({
  footerButton: {
    width: 300,
    borderRadius: 100,
  },

  buttonStyle: {
    borderWidth: 1,
    height: 50,
    borderColor: Color.OceanBlue,
    backgroundColor: Color.White,
  },

  footerButtonLabel: {
    color: Color.OceanBlue,
    fontWeight: '600',
  },
});
