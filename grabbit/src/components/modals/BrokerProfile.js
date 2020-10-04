import React from 'react';
import {View, Modal, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';

import {Color, FakeImage} from 'grabbit/src/const';
import {IconLeftButton} from 'grabbit/src/components/buttons';

const user = {
  id: '6',
  image_url: FakeImage,
  like_count: 312,
  views: 1281,
  interest: 58,
  grabs: 13,
  link: 'https://google.com',
  name: 'Ava Jah Morant',
  bio:
    'Donec dignissim ligula non dolor euismod tincidunt. Etiam pulvinar interdum ligula, vitae luctus odio rutrum vel. Mauris ultricies augue erat, sed luctus ipsum dictum non. Sed eu tincidunt ligula, ac maximus sapien.',
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
                  // borderWidth: 1,
                  // borderColor: 'blue',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Icon
                  style={styles.FlatListRowImage__Container__Info__Icon}
                  name="heart"
                  size={20}
                  color={Color.GreyText}
                />
                <Text style={styles.FlatListRowImage__Container__Info__Number}>{user.like_count}</Text>
                <Icon
                  style={styles.FlatListRowImage__Container__Info__Icon}
                  name="shopping-bag"
                  size={20}
                  color={Color.GreyText}
                />
                <Text style={styles.FlatListRowImage__Container__Info__Number}>{user.grabs}</Text>
                <Icon style={styles.FlatListRowImage__Container__Info__Icon} name="zap" size={20} color={Color.Pink2} />
                <Text style={styles.FlatListRowImage__Container__Info__Number}>{user.interest}</Text>
                <Icon
                  style={styles.FlatListRowImage__Container__Info__Icon}
                  name="tv"
                  size={20}
                  color={Color.GreyText}
                />
                <Text style={styles.FlatListRowImage__Container__Info__Number}>{user.views}</Text>
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: 'orange',
                  padding: 5,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Color.GreyText,
                    fontSize: 12,
                  }}>
                  {user.bio}
                </Text>

                <IconLeftButton
                  title="Message"
                  buttonStyle={{
                    width: 150,
                    height: 40,
                    borderColor: Color.Pink2,
                    borderWidth: 1,
                    backgroundColor: Color.Pink2,
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 40,
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                  iconColor={Color.White}
                  iconName={'send'}
                  titleStyle={{
                    color: Color.White,
                    fontWeight: 'bold',
                  }}
                  onPress={() => {
                    this.hide();
                    Actions.chatView();
                  }}
                />
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
    marginBottom: 275,
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
