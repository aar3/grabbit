import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, StyleSheet, FlatList} from 'react-native';

import {Color} from 'grabbit/src/const';
import Icon from 'react-native-vector-icons/Feather';

const detailSelections = [
  {
    id: '0',
    title: 'Leave Feedback',
    onPress: () => console.log('Feedback left'),
  },
  {
    id: '1',
    title: 'Report a problem with this Product',
    onPress: () => console.log('Product problem reported'),
  },
  {
    id: '2',
    title: 'Report a problem with this Merchant',
    onPress: () => console.log('Merchant problem reported'),
  },
  {
    id: '3',
    title: 'Report another problem',
    onPress: () => console.log('Another problem reported'),
  },
];

class DetailsItem extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity onPress={data.onPress}>
        <View style={styles.DetailsItem}>
          <Text>{data.title}</Text>
          <Icon style={{position: 'absolute', right: 10}} name="chevron-right" size={15} color={Color.GreyText} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default class M extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailsModal: false,
    };
  }

  show() {
    this.setState({showDetailsModal: true});
  }

  hide() {
    this.setState({showDetailsModal: false});
  }

  _renderDetailItem({item, index}) {
    return <DetailsItem data={item} />;
  }

  render() {
    return (
      <Modal
        animation={'fade'}
        transparent={true}
        visible={this.state.showDetailsModal}
        onRequestClose={() => {
          console.log('modal closed');
          this.setState({showDetailsModal: false});
        }}>
        <View style={styles.ProductInfoView__ModalContainer}>
          <View style={styles.ProductInfoView__ModalContainer__TopBar}>
            <TouchableOpacity onPress={() => this.setState({showDetailsModal: false})}>
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
    marginBottom: 300,
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
  },
  ProductInfoView__ModalContainer__TopBar: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '100%',
  },
  ProductInfoView__ModalContainer__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
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
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
  },
});
