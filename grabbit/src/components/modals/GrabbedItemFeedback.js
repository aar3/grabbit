import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, StyleSheet, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';

import {Color, FakeImage} from 'grabbit/src/const';
import {IconLeftButton} from 'grabbit/src/components/buttons';

const user = {
  name: 'Rashad Alston',
  bio: 'It is what it is.',
  image_url: FakeImage,
};

const grab = {
  grabbed_on: '09/12/2021',
  expected_delivery: '10/10/2021',
  match: {
    matched_on: '01/20/2020',
  },
};

export default class M extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  show() {
    this.setState({showModal: true});
  }

  hide() {
    this.setState({showModal: false});
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
        <View style={styles.BrokerProfile__ModalContainer}>
          <View style={styles.BrokerProfile__ModalContainer__TopBar}>
            <TouchableOpacity onPress={() => this.setState({showModal: false})}>
              <Icon name="x" size={15} color={Color.GreyText} />
            </TouchableOpacity>
          </View>
          <View style={styles.BrokerProfile__ModalContainer__ContentContainer}>
            <View style={styles.BrokerProfile__ModalContainer__ContentContainer__Header}>
              <Image
                source={require('../../../assets/imgs/placeholder.jpg')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <View style={styles.BrokerProfile__ModalContainer__ContentContainer__InfoContainer}>
              <View
                style={
                  {
                    // borderWidth: 1,
                    // borderColor: 'red',
                  }
                }>
                <Text
                  style={{
                    marginBottom: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: Color.Pink2,
                  }}>
                  {user.name}
                </Text>
              </View>
              <View
                style={{
                  //   borderWidth: 1,
                  //   borderColor: 'orange',
                  padding: 5,
                  justifyContent: 'center',
                  //   alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Color.Black,
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {'Matched On: '} {grab.match.matched_on}
                </Text>
                <Text
                  style={{
                    color: Color.Black,
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {'Grabbed On: '} {grab.grabbed_on}
                </Text>
                <Text
                  style={{
                    color: Color.Black,
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {'Expected Delivery: '} {grab.expected_delivery}
                </Text>

                <View
                  style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    flexDirection: 'row',
                  }}>
                  <IconLeftButton
                    title="Leave Feedback"
                    buttonStyle={{
                      width: 200,
                      height: 40,
                      borderColor: Color.Pink2,
                      borderWidth: 1,
                      backgroundColor: Color.Pink2,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 40,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    iconColor={Color.White}
                    iconName={'smile'}
                    titleStyle={{
                      color: Color.White,
                      fontWeight: 'bold',
                    }}
                    onPress={() => {
                      this.hide();
                      Actions.feedbackView();
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  BrokerProfile__ModalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 250,
    marginBottom: 325,
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
  BrokerProfile__ModalContainer__TopBar: {
    // borderWidth: 1,
    // borderColor: 'green',
    width: '100%',
  },
  BrokerProfile__ModalContainer__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BrokerProfile__ModalContainer__ContentContainer__Header: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  BrokerProfile__ModalContainer__ContentContainer__InfoContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
    marginTop: 20,
  },
  FlatListRowImage__Container__Info__Icon: {
    marginLeft: 10,
  },
  FlatListRowImage__Container__Info__Number: {
    marginLeft: 5,
  },
});
