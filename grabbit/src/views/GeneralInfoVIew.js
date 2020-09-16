import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class GeneralInfoView extends React.Component {
  render() {
    return (
      <View style={styles.GeneralInfoView}>
        <Text>{'GeneralInfoView Screen'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  GeneralInfoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
