import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Color} from 'grabbit/src/Const';
import {getStateForKey} from 'grabbit/src/Utils';

class BasicTopNavigationBar extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'orange',
          flexDirection: 'row',
          height: 90,
          padding: 10,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: Color.LightGrey,
          width: '100%',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'green',
            top: 40,
            height: 40,
            width: 40,
            position: 'absolute',
            left: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            top: 40,
            height: 40,
            width: 40,
            borderRadius: 50,
            left: 180,
            position: 'absolute',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'red',
            top: 40,
            borderRadius: 50,
            height: 40,
            width: 40,
            left: 330,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {null}
        </View>
      </View>
    );
  }
}

export const mapStateToProps = function (state) {
  return {
    user: getStateForKey('state.user', state),
  };
};

export default {
  BasicTopNavigationBar: connect(mapStateToProps)(BasicTopNavigationBar),
};
