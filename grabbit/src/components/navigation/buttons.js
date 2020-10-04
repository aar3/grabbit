import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {TabIconSize, Color, FakeImage} from 'grabbit/src/const';

export const BackButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.pop()}>
      <View style={styles.BaseTopNavigationBar__Button}>
        <Icon name={'chevron-left'} size={TabIconSize} color={Color.GreyText} />
      </View>
    </TouchableOpacity>
  );
};

export const AccountSettingsButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.generalInfoView()}>
      <View style={styles.BaseTopNavigationBar__Button}>
        <Icon name={'settings'} size={TabIconSize} color={Color.GreyText} />
      </View>
    </TouchableOpacity>
  );
};

export const ImageButton = () => {
  return (
    <TouchableOpacity onPress={() => console.log('image button clicked')}>
      <View style={styles.BaseTopNavigationBar__Button}>
        <Image source={{uri: FakeImage}} style={{height: 40, width: 40}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BaseTopNavigationBar__Button: {
    // borderWidth: 1,
    // borderColor: 'green',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
