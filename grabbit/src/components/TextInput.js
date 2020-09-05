import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Color, Font} from 'grabbit/src/const';

export class BasicTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    let {value, label, labelStyle, inputStyle} = this.props;
    value = this.state.text === '' && value ? value : this.state.text;
    return (
      <View style={styles.TextInput__Container}>
        <Text style={labelStyle || styles.TextInput__Label}>{label || 'Unlabeled'}</Text>
        <TextInput
          value={value}
          onChangeText={(text) => this.setState({text})}
          style={inputStyle || styles.TextInput__Container__Input}
        />
      </View>
    );
  }
}

export class SearchTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    let {value} = this.props;
    value = this.state.text === '' && value ? value : this.state.text;
    return (
      <View style={styles.SearchTextInput__Container}>
        <View style={styles.SearchTextInput__Container__Icon}>
          <Icon name="search" size={20} />
        </View>
        <TextInput
          value={value}
          onChangeText={(text) => this.setState({text})}
          style={styles.SearchTextInput__Container__Input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInput__Container: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: 300,
    marginBottom: 10,
  },
  TextInput__Container__Input: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    padding: 5,
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'Arial',
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Color.White,
  },
  SearchTextInput__Container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'blue',
    width: '100%',
    backgroundColor: Color.White,
    padding: 5,
  },
  SearchTextInput__Container__Icon: {
    borderWidth: 1,
    borderColor: 'red',
    width: 40,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchTextInput__Container__Input: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    fontSize: 12,
    fontFamily: 'Arial',
    width: '90%',
  },
  TextInput__Label: {
    fontSize: 12,
    paddingBottom: 5,
    // fontFamily: Font.Default,
  },
});
