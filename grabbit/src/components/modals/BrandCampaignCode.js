import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, Clipboard} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {Color} from 'grabbit/src/const';

class M extends React.Component {
  constructor(props) {
    super(props);
  }

  show() {
    const {toggleBrokerDiscoverBrandCampaignModal} = this.props;
    toggleBrokerDiscoverBrandCampaignModal();
  }

  hide() {
    const {toggleBrokerDiscoverBrandCampaignModal} = this.props;
    toggleBrokerDiscoverBrandCampaignModal();
  }

  renderCopiedCodeView() {
    const {hasCopiedCurrentCampaignCode} = this.props;
    if (!hasCopiedCurrentCampaignCode) {
      return null;
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 150,
          // borderWidth: 1,
          // borderColor: 'red',
          marginTop: 10,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{fontWeight: 'bold', color: Color.ForestGreen}}>Code copied</Text>
        <Icon name="check" size={20} color={Color.ForestGreen} />
      </View>
    );
  }

  render() {
    const {
      toggleBrokerDiscoverBrandCampaignModal,
      clearClipboardCopy,
      showSuccessfulClipboardCopy,
      currentCampaignCode,
      showBrandCampaignModal,
    } = this.props;
    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={showBrandCampaignModal}
        onRequestClose={() => {
          console.log('modal closed');
          toggleBrokerDiscoverBrandCampaignModal();
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            marginTop: 250,
            marginBottom: 315,
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                clearClipboardCopy();
                toggleBrokerDiscoverBrandCampaignModal();
              }}>
              <Icon name="x" size={15} color={Color.GreyText} />
            </TouchableOpacity>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                height: '90%',
                width: '100%',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'red',
                  width: 160,
                  height: 35,
                  marginBottom: 20,
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../../assets/imgs/Grabbit_Gradient_Letters_111x500.png')}
                  style={{flex: 1, height: undefined, width: undefined}}
                />
              </View>
              <Text
                style={{
                  marginBottom: 20,
                }}>
                Place the hashtag below in your Stories, and Posts so that we can track engagement.
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  marginBottom: 30,
                }}>
                #{currentCampaignCode.code}
              </Text>
              <Button
                // Using react-native Clipboard instead of react-native community
                // due to https://stackoverflow.com/a/60948928/4701228
                onPress={() => {
                  Clipboard.setString(currentCampaignCode.code);
                  showSuccessfulClipboardCopy();
                }}
                buttonStyle={{
                  borderRadius: 30,
                  width: 200,
                  borderWidth: 0,
                  backgroundColor: Color.White,
                  borderColor: Color.Pink2,
                  borderWidth: 1,
                }}
                titleStyle={{
                  color: Color.Pink2,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
                type="outline"
                title="Copy To Clipboard"
              />
              {this.renderCopiedCodeView()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {brokerDiscover} = state;
  return {
    hasCopiedCurrentCampaignCode: brokerDiscover.hasCopiedCurrentCampaignCode,
    showBrandCampaignModal: brokerDiscover.showBrandCampaignModal,
    currentCampaignCode: brokerDiscover.currentCampaignCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearClipboardCopy: () => {
      return dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_CAMPAIGN_CODE_COPIED,
      });
    },

    showSuccessfulClipboardCopy: () => {
      return dispatch({
        type: REDUX_ACTIONS.CURRENT_CAMPAIGN_CODE_COPIED,
      });
    },

    toggleBrokerDiscoverBrandCampaignModal: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_BROKER_BRAND_CAMPAIGN_MODAL,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);
