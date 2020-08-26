import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export class BasicTextInput extends React.Component {
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
      <View style={styles.TextInput__Container}>
        <Text style={styles.TextInput__Label}>{this.props.label}</Text>
        <TextInput
          value={value}
          onChangeText={(text) => this.setState({text})}
          style={styles.TextInput__Container__Input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInput__Container: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 250,
    marginBottom: 10,
  },
  TextInput__Container__Input: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    fontSize: 12,
    fontFamily: 'Arial',
    width: '100%',
    height: 35,
  },
  TextInput__Label: {
    fontSize: 12,
    paddingBottom: 5,
  },
});
