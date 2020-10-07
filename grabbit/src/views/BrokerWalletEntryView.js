import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

export default class V extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            borderColor: 'blue',
            borderWidth: 1,
          }}>
          <View
            style={{
              height: 200,
              width: '100%',
            }}>
            <Text>Header</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'orange',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={styles.GridItemContainer}>
              <Text>Foo</Text>
            </View>
            <View style={styles.GridItemContainer}>
              <Text>Bar</Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'orange',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={styles.GridItemContainer}>
              <Text>Foo</Text>
            </View>
            <View style={styles.GridItemContainer}>
              <Text>Bar</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  GridItemContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: 170,
    height: 250,
  },
});
