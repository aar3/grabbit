import React from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {Color} from 'grabbit/src/Const';
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
            shadowOpacity: 0.75,
            shadowRadius: 50.84,
            elevation: 10,
          }}>
          <View
            style={{
              borderWidth: 1,
              height: 30,
              borderColor: 'green',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => this.props.toggleFocusedDealModal()}>
              <Icon name="x" size={30} color={Color.BorderLightGrey} />
            </TouchableOpacity>
          </View>
          <Text>{this.props.userDeal.deal.title}</Text>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);
