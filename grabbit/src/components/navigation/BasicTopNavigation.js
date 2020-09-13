import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {Color} from 'grabbit/src/const';

class BaseTopNavigationBar extends React.Component {
  render() {
    const {user} = this.props;

    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__LeftContent}>{null}</View>
        <View style={styles.BasicTopNavigation__ContentContainer__CenterContent}>{null}</View>
        <View style={styles.BasicTopNavigation__ContentContainer__RightContent}>{null}</View>
        <View style={styles.BasicTopNavigation__ContentContainer__RightContent}>{null}</View>
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

export default connect(mapStateToProps)(BaseTopNavigationBar);

export const styles = StyleSheet.create({
  BasicTopNavigation__ContentContainer: {
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
  BasicTopNavigation__ContentContainer__LeftContent: {
    // borderWidth: 1,
    // borderColor: 'green',
    top: 40,
    height: 40,
    width: 40,
    position: 'absolute',
    left: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BasicTopNavigation__ContentContainer__CenterContent: {
    // borderWidth: 1,
    // borderColor: 'black',
    top: 30,
    height: 40,
    width: 40,
    borderRadius: 50,
    left: 170,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BasicTopNavigation__ContentContainer__RightContent: {
    // borderWidth: 1,
    // borderColor: 'red',
    top: 30,
    borderRadius: 50,
    height: 40,
    width: 40,
    left: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
