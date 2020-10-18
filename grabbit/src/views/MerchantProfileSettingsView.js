import React from 'react';
import {Text, View} from 'react-native';

export default class V extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{'MerchantProfileSettingsView Screen'}</Text>
      </View>
    );
  }
}
