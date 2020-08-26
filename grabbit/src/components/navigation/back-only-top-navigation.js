import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {styles} from 'grabbit/src/components/navigation/basic-top-navigation';
import {BackButton} from 'grabbit/src/components/navigation/buttons';

export default class BackOnlyTopNavigationBar extends React.Component {
  render() {
    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__LeftContent}>
          {<BackButton />}
        </View>
      </View>
    );
  }
}
