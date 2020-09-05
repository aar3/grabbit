import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {styles} from 'grabbit/src/components/navigation/BasicTopNavigation';
import {BackButton} from 'grabbit/src/components/navigation/buttons';
import {Color, Font} from 'grabbit/src/const';

export default class MerchantExploreTopNavigation extends React.Component {
  render() {
    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__LeftContent}>{null}</View>
        <View style={styles.BasicTopNavigation__ContentContainer__CenterContent}>
          <TouchableOpacity onPress={null}>
            <Icon name="map" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
