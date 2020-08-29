import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {Color} from 'grabbit/src/const';
import {Actions} from 'react-native-router-flux';

class ActivityTopNavigation extends React.Component {
  render() {
    const {user} = this.props;

    return (
      <View style={styles.ActivityTopNavigation__ContentContainer}>
        <View
          style={styles.ActivityTopNavigation__ContentContainer__LeftContent}>
          <TouchableOpacity onPress={() => Actions.likedProducts()}>
            <Text
              style={
                styles.ActivityTopNavigation__ContentContainer__HeaderLabel
              }>
              {'Liked'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.ActivityTopNavigation__ContentContainer__CenterContent}>
          <TouchableOpacity onPress={() => Actions.brokerMatches()}>
            <Text
              style={
                styles.ActivityTopNavigation__ContentContainer__HeaderLabel
              }>
              {'Matched'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.ActivityTopNavigation__ContentContainer__RightContent}>
          <TouchableOpacity onPress={() => Actions.grabbed()}>
            <Text
              style={
                styles.ActivityTopNavigation__ContentContainer__HeaderLabel
              }>
              {'Grabbed'}
            </Text>
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
    borderWidth: 1,
    borderColor: 'orange',
    flexDirection: 'row',
    height: 90,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Color.LightGrey,
    width: '100%',
  },
  ActivityTopNavigation__ContentContainer__LeftContent: {
    borderWidth: 1,
    borderColor: 'green',
    top: 40,
    height: 40,
    // width: 40,
    position: 'absolute',
    left: 30,
    // borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__CenterContent: {
    borderWidth: 1,
    borderColor: 'black',
    top: 30,
    height: 40,
    // width: 40,
    // borderRadius: 50,
    left: 170,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__RightContent: {
    borderWidth: 1,
    borderColor: 'red',
    top: 30,
    // borderRadius: 50,
    height: 40,
    // width: 40,
    left: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__HeaderLabel: {
    fontWeight: '900',
    color: Color.LightGrey,
  },
});
