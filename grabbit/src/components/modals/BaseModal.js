/**
 * For reference only !!!
 */

import React from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
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
            <Text>{currentCampaignCode.code}</Text>
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
