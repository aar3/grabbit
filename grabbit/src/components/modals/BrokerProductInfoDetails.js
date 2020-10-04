import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, StyleSheet, FlatList} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';
import REDUX_ACTIONS from 'grabbit/src/actions';

const detailSelections = [
  {
    id: '0',
    title: 'Leave Feedback',
    onPress: () => Actions.feedbackView(),
    payload: 'leave_feedback',
  },
  {
    id: '1',
    title: 'Report a problem with this Product',
    onPress: () => Actions.feedbackView(),
    payload: 'problem_with_product',
  },
  {
    id: '2',
    title: 'Report a problem with this Merchant',
    onPress: () => Actions.feedbackView(),
    payload: 'problem_with_merchant',
  },
  {
    id: '3',
    title: 'Report another problem',
    onPress: () => Actions.feedbackView(),
    payload: 'another_problem',
  },
];

class DetailsItem extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.DetailsItem}>
        <Text>{data.title}</Text>
        <Icon style={{position: 'absolute', right: 10}} name="chevron-right" size={15} color={Color.GreyText} />
      </View>
    );
  }
}

class M extends React.Component {
  constructor(props) {
    super(props);
    // this._renderDetailItem = this._renderDetailItem.bind(this);
  }

  render() {
    const {toggleDetailsModalForBroker, showDetailsModalForBroker} = this.props;
    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={showDetailsModalForBroker}
        onRequestClose={() => toggleDetailsModalForBroker()}>
        <View style={styles.ProductInfoView__ModalContainer}>
          <View style={styles.ProductInfoView__ModalContainer__TopBar}>
            <TouchableOpacity onPress={() => toggleDetailsModalForBroker()}>
              <Icon name="x" size={15} color={Color.GreyText} />
            </TouchableOpacity>
          </View>
          <View style={styles.ProductInfoView__ModalContainer__ContentContainer}>
            <View style={styles.ProductInfoView__ModalContainer__ContentContainer__Header}>
              <Image
                source={require('../../../assets/imgs/Grabbit_Gradient_G_300x300.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <View style={styles.ProductInfoView__ModalContainer__ContentContainer__Selections}>
              <FlatList
                style={styles.ProductInfoView__ModalContainer__ContentContainer__Selections__FlatList}
                data={detailSelections}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        toggleDetailsModalForBroker();

                        Actions.feedbackView();
                      }}>
                      <DetailsItem data={item} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(_item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {productInfo} = state;
  return {
    showDetailsModalForBroker: productInfo.showDetailsModalForBroker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFeedbackTopic: ({feedbackTopic}) => {
      return dispatch({
        type: REDUX_ACTIONS.SET_FEEDBACK_TOPIC,
        payload: {feedbackTopic},
      });
    },
    toggleDetailsModalForBroker: () => {
      return dispatch({
        type: REDUX_ACTIONS.TOGGLE_BROKER_PRODUCT_DETAILS_MODAL,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(M);

const styles = StyleSheet.create({
  ProductInfoView__ModalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 300,
    marginBottom: 315,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ProductInfoView__ModalContainer__TopBar: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '100%',
    padding: 5,
  },
  ProductInfoView__ModalContainer__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    marginTop: -5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProductInfoView__ModalContainer__ContentContainer__Header: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 50,
    height: 50,
  },
  ProductInfoView__ModalContainer__ContentContainer__Selections: {
    // borderWidth: 1,
    // borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  ProductInfoView__ModalContainer__ContentContainer__Selections__FlatList: {
    width: '100%',
    marginBottom: -20,
    // borderWidth: 1,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderColor: Color.LightGrey,
  },
  DetailsItem: {
    // borderWidth: 1,
    // borderColor: 'green',
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderTopColor: Color.LightGrey,
    borderTopWidth: 1,
  },
});
