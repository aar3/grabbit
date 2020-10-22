import React from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';
import {Color, FakeImage} from 'grabbit/src/const';

export default class V extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="plus-circle" size={40} color={Color.LightGrey} />
        </TouchableOpacity>
      </View>
    );
  }
}
