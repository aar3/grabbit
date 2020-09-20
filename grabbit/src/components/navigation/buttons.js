import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {TabIconSize, Color} from 'grabbit/src/const';

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
    <TouchableOpacity onPress={() => Actions.generalInfo()}>
      <View style={styles.BaseTopNavigationBar__Button}>
        <Icon name={'settings'} size={TabIconSize} color={Color.GreyText} />
      </View>
    </TouchableOpacity>
  );
};

export const ImageButton = () => {
  const {onPress, imageURI} = this.props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.FlatListRow__Container__Image}>
        <Image source={{uri: imageURI}} style={{height: 40, width: 40}} />
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
