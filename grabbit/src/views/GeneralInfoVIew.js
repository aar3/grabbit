import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';

import {Color} from 'grabbit/src/const';

data = [
  {
    id: '1',
    name: 'About Grabbit',
    routeKey: 'aboutGrabbit',
  },
  {
    id: '2',
    name: 'Terms & Conditions',
    routeKey: 'termsAndConditions',
  },
  {
    id: '3',
    name: 'Privacy Policy',
    routeKey: 'privacyPolicy',
  },
];

export default class GeneralInfoView extends React.Component {
  _renderItem({item, index}) {
    return (
      <TouchableOpacity onPress={() => Actions[item.routeKey]()}>
        <View style={styles.GeneralInfoView__RowItem__Container}>
          <Text>{item.name}</Text>
          <Icon
            name={'chevron-right'}
            color={Color.LightGrey}
            size={20}
            style={{
              position: 'absolute',
              right: 10,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.GeneralInfoView}>
        <FlatList
          style={styles.GeneralInfoView__FlatList}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(_item, index) => index.toString()}
        />
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            padding: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: Color.DarkerGrey,
              textAlign: 'center',
            }}>
            {
              'Duis pellentesque nisl vel justo malesuada, ac lobortis odio posuere. Duis eros ante, consectetur tempus tellus ut, egestas fringilla arcu. Integer in sollicitudin ipsum, ac efficitur dui. Phasellus semper finibus ante, eu accumsan ligula posuere eget. Nullam non urna venenatis, cursus dolor in, tristique purus. Aliquam iaculis mi turpis, ac tincidunt quam tristique a.'
            }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  GeneralInfoView: {
    flex: 1,
    alignItems: 'center',
  },
  GeneralInfoView__FlatList: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: '100%',
    maxHeight: 120,
  },
  GeneralInfoView__RowItem__Container: {
    height: 40,
    width: '100%',
    padding: 10,
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
