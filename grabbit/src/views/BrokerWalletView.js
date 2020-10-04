import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {connect} from 'react-redux';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: 'red',
            }}>
            <Image source={{uri: user.qr_code_url}} style={{height: 100, width: 100}} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {auth} = state;
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(V);
