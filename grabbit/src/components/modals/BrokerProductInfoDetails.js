import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, StyleSheet, FlatList} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';

const detailSelections = [
  {
    id: '0',
    title: 'Leave Feedback',
    onPress: () => Actions.feedback(),
  },
  {
    id: '1',
    title: 'Report a problem with this Product',
    onPress: () => Actions.feedback(),
  },
  {
    id: '2',
    title: 'Report a problem with this Merchant',
    onPress: () => Actions.feedback(),
  },
  {
    id: '3',
    title: 'Report another problem',
    onPress: () => Actions.feedback(),
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

export default class M extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this._renderDetailItem = this._renderDetailItem.bind(this);
  }

  show() {
    this.setState({showModal: true});
  }

  hide() {
    this.setState({showModal: false});
  }

  _renderDetailItem({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.hide();
          Actions.feedback();
        }}>
        <DetailsItem data={item} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={this.state.showModal}
        onRequestClose={() => {
          console.log('modal closed');
          this.setState({showModal: false});
        }}>
        <View style={styles.ProductInfoView__ModalContainer}>
          <View style={styles.ProductInfoView__ModalContainer__TopBar}>
            <TouchableOpacity onPress={() => this.setState({showModal: false})}>
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
                renderItem={this._renderDetailItem}
                keyExtractor={(_item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

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
