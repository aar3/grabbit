import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';
import {Actions} from 'react-native-router-flux';

class ActivityTopNavigation extends React.Component {
  render() {
    const {user} = this.props;
    // TODO: depends on which button is clicked, save that state in the reducer
    // then give the buttons a color depending on which one is in the reducer
    return (
      <View style={styles.ActivityTopNavigation__ContentContainer}>
        <View style={styles.ActivityTopNavigation__ContentContainer__First}>
          <TouchableOpacity onPress={() => Actions.likedProducts()}>
            <Icon name="heart" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View>
        <View style={styles.ActivityTopNavigation__ContentContainer__Second}>
          <TouchableOpacity onPress={() => Actions.brokerMatches()}>
            <Icon name="users" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View>
        <View style={styles.ActivityTopNavigation__ContentContainer__Third}>
          <TouchableOpacity onPress={() => Actions.offers()}>
            <Icon name="clock" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View>
        <View style={styles.ActivityTopNavigation__ContentContainer__Fourth}>
          <TouchableOpacity onPress={() => Actions.grabbed()}>
            <Icon name="check-circle" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const mapStateToProps = (state) => {
  const {session} = state;
  return {
    // user: session.user,
    user: null,
  };
};

export default connect(mapStateToProps)(ActivityTopNavigation);

export const styles = StyleSheet.create({
  ActivityTopNavigation__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'orange',
    flexDirection: 'row',
    height: 90,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Color.LightGrey,
    width: '100%',
  },
  ActivityTopNavigation__ContentContainer__First: {
    // borderWidth: 1,
    // borderColor: 'green',
    top: 40,
    height: 40,
    position: 'absolute',
    left: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__Second: {
    // borderWidth: 1,
    // borderColor: 'black',
    top: 30,
    height: 40,
    left: 130,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__Third: {
    // borderWidth: 1,
    // borderColor: 'red',
    top: 30,
    height: 40,
    left: 215,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__Fourth: {
    // borderWidth: 1,
    // borderColor: 'red',
    top: 30,
    height: 40,
    left: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__HeaderLabel: {
    fontWeight: '900',
    color: Color.LightGrey,
  },
});
