import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
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

  render() {
    const {toggleBrokerDiscoverBrandCampaignModal, currentCampaignCode, showBrandCampaignModal} = this.props;
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
            <TouchableOpacity onPress={() => toggleBrokerDiscoverBrandCampaignModal()}>
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
                onPress={() => Clipboard.setString(currentCampaignCode.code)}
                buttonStyle={{
                  borderRadius: 30,
                  width: 200,
                  borderWidth: 0,
                  backgroundColor: Color.Pink2,
                }}
                titleStyle={{
                  color: Color.White,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
                type="outline"
                title="Copy To Clipboard"
              />
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
    showBrandCampaignModal: brokerDiscover.showBrandCampaignModal,
    currentCampaignCode: brokerDiscover.currentCampaignCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBrokerDiscoverBrandCampaignModal: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_BROKER_BRAND_CAMPAIGN_MODAL,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);
