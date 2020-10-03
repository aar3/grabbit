import React from 'react';
import {View} from 'react-native';

import {styles} from 'grabbit/src/components/navigation/BasicTopNavigation';
import {BackButton} from 'grabbit/src/components/navigation/buttons';

export default class BackOnlyTopNavigationBar extends React.Component {
  render() {
    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__LeftContent}>{<BackButton />}</View>
      </View>
    );
  }
}
