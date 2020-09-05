import React from 'react';
import {View, StyleSheet, Picker, Text} from 'react-native';

import {Color} from 'grabbit/src/const';

export class StatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateValue: '',
    };
  }
  render() {
    return (
      <View style={styles.StatePicker}>
        <Text style={{fontSize: 12, marginBottom: 5}}>{'State'}</Text>
        <Picker
          selectedValue={this.state.stateValue}
          itemStyle={{
            height: 40,
            width: 70,
            borderWidth: 1,
            borderColor: Color.LightGrey,
            marginBottom: 20,
            borderRadius: 5,
          }}
          onValueChange={(itemValue, itemIndex) => this.setState({stateValue: itemValue})}>
          <Picker.Item label="--" value={null} />
          <Picker.Item label="AL" value="AL" />
          <Picker.Item label="AK" value="AK" />
          <Picker.Item label="AZ" value="AZ" />
          <Picker.Item label="AR" value="AR" />
          <Picker.Item label="CA" value="CA" />
          <Picker.Item label="CO" value="CO" />
          <Picker.Item label="CT" value="CT" />
          <Picker.Item label="DE" value="DE" />
          <Picker.Item label="FL" value="FL" />
          <Picker.Item label="GA" value="GA" />
          <Picker.Item label="HI" value="HI" />
          <Picker.Item label="ID" value="ID" />
          <Picker.Item label="IL" value="IL" />
          <Picker.Item label="IN" value="IN" />
          <Picker.Item label="IA" value="IA" />
          <Picker.Item label="KS" value="KS" />
          <Picker.Item label="KY" value="KY" />
          <Picker.Item label="LA" value="LA" />
          <Picker.Item label="ME" value="ME" />
          <Picker.Item label="MD" value="MD" />
          <Picker.Item label="MA" value="MA" />
          <Picker.Item label="MI" value="MI" />
          <Picker.Item label="MN" value="MN" />
          <Picker.Item label="MS" value="MS" />
          <Picker.Item label="MO" value="MO" />
          <Picker.Item label="MT" value="MT" />
          <Picker.Item label="NE" value="NE" />
          <Picker.Item label="NV" value="NV" />
          <Picker.Item label="NH" value="NH" />
          <Picker.Item label="NJ" value="NJ" />
          <Picker.Item label="NM" value="NM" />
          <Picker.Item label="NY" value="NY" />
          <Picker.Item label="NC" value="NC" />
          <Picker.Item label="ND" value="ND" />
          <Picker.Item label="OH" value="OH" />
          <Picker.Item label="OK" value="OK" />
          <Picker.Item label="OR" value="OR" />
          <Picker.Item label="PA" value="PA" />
          <Picker.Item label="RI" value="RI" />
          <Picker.Item label="SC" value="SC" />
          <Picker.Item label="SD" value="SD" />
          <Picker.Item label="TN" value="TN" />
          <Picker.Item label="TX" value="TX" />
          <Picker.Item label="UT" value="UT" />
          <Picker.Item label="VT" value="VT" />
          <Picker.Item label="VA" value="VA" />
          <Picker.Item label="WA" value="WA" />
          <Picker.Item label="WV" value="WV" />
          <Picker.Item label="WI" value="WI" />
          <Picker.Item label="WY" value="WY" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StatePicker: {
    // borderWidth: 1,
    // borderColor: 'red',
    position: 'relative',
    right: 115,
    // alignItems: 'center',
  },
});
