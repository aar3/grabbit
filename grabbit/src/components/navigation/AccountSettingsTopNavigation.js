import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {styles} from 'grabbit/src/components/navigation/BasicTopNavigation';
import {AccountSettingsButton} from 'grabbit/src/components/navigation/buttons';

export default class C extends React.Component {
  render() {
    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__RightContent}>{<AccountSettingsButton />}</View>
      </View>
    );
  }
}
