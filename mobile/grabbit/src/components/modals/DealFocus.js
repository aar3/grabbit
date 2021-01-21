import React from 'react';
import {View, Modal, TouchableOpacity, Image, Text, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import ReduxActions from 'grabbit/src/Actions';
import {Color, MerchantLogos} from 'grabbit/src/Const';
import {GrabbitButton} from 'grabbit/src/components/Basic';
import {getStateForKey} from 'grabbit/src/Utils';

class M extends React.Component {
  constructor(props) {
    super(props);
  }

  show() {
    return this.props.toggleFocusedDealModal();
  }

  hide() {
    return this.props.toggleFocusedDealModal();
  }

  render() {
    const merchantLogo = MerchantLogos[this.props.userDeal.deal.merchant_name];
    return (
      <Modal
        animationType={'slid'}
        transparent={true}
        visible={this.props.showDealFocusedModal}
        onRequestClose={() => {
          console.log('modal closed');
          this.props.toggleFocusedDealModal();
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: 50,
            marginBottom: 50,
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
              // borderWidth: 1,
              // borderColor: 'green',
              height: 30,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => this.props.toggleFocusedDealModal()}>
              <Icon name="x" size={30} color={Color.BorderLightGrey} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: Color.BorderLightGrey,
                height: 100,
                width: 100,
                borderRadius: 100,
                overflow: 'hidden',
              }}>
              <Image source={{uri: merchantLogo}} style={{width: 100, height: 100}} />
            </View>
            <Text
              style={{
                marginTop: 20,
                fontWeight: '600',
                color: Color.ReadableGreyText,
              }}>
              {this.props.userDeal.deal.merchant_name}
            </Text>

            <Text
              style={{
                marginTop: 20,
                color: Color.ReadableGreyText,
              }}>
              {this.props.userDeal.deal.title}
            </Text>

            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                marginTop: 20,
                width: '100%',
                height: 150,
              }}>
              <FlatList
                horizontal
                keyExtractor={(_item, index) => index.toString()}
                style={{
                  height: 150,
                }}
                data={this.props.userDeal.deal.all_img_urls}
                renderItem={({item, index}) => {
                  return (
                    <Image
                      source={{uri: item}}
                      style={{
                        height: 150,
                        width: 150,
                        borderWidth: 1,
                        borderColor: Color.BorderLightGrey,
                        marginLeft: 5,
                      }}
                    />
                  );
                }}
              />
            </View>

            <Text
              style={{
                marginTop: 20,
                color: Color.ReadableGreyText,
                fontSize: 12,
                textAlign: 'center',
              }}>
              {this.props.userDeal.deal.description}
            </Text>

            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'green',
                marginTop: 20,
              }}>
              <GrabbitButton
                disabled={this.props.userDeal.is_on_watchlist}
                onPress={
                  this.props.userDeal.is_on_watchlist
                    ? null
                    : () =>
                        this.props.putUserDealOnWatchList({
                          endpoint: `/users/${this.props.user.id}/deals/${this.props.userDeal.id}/`,
                          method: 'PUT',
                          headers: {
                            'X-Session-Token': this.props.user.current_session_token,
                            'Content-Type': 'application/json',
                          },
                          data: {
                            user_id: this.props.user.id,
                            deal_id: this.props.deal.id,
                            is_on_watchlist: 1,
                          },
                        })
                }
                _buttonStyle={{
                  backgroundColor: Color.White,
                  borderColor: Color.QueenBlue,
                  borderWidth: 1,
                }}
                titleStyle={{
                  color: Color.QueenBlue,
                  fontWeight: 'bold',
                }}
                title="Add to Watch List"
              />
              <GrabbitButton
                _buttonStyle={{
                  backgroundColor: Color.White,
                  borderColor: Color.QueenBlue,
                  borderWidth: 1,
                }}
                titleStyle={{
                  color: Color.QueenBlue,
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
  return {
    showDealFocusedModal: getStateForKey('state.deals.focused.show_modal', state),
    userDeal: getStateForKey('state.deals.focused.item', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    toggleFocusedDealModal: () => {
      return dispatch({
        type: ReduxActions.Deals.ToggleFocusedDealModal,
      });
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

export default connect(mapStateToProps, mapDispatchToProps)(M);

const styles = StyleSheet.create({
  footerButton: {
    width: 300,
    borderRadius: 100,
  },

  buttonStyle: {
    borderWidth: 1,
    height: 50,
    borderColor: Color.QueenBlue,
    backgroundColor: Color.White,
  },

  footerButtonLabel: {
    color: Color.QueenBlue,
    fontWeight: '600',
  },
});
