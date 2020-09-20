import React from 'react';
import {StyleSheet, Text, Picker, KeyboardAvoidingView, View} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {BasicTextInput, BasicTextAreaInput} from 'grabbit/src/components/text-input';
import {IconLeftButton} from 'grabbit/src/components/buttons';

import {Color} from 'grabbit/src/const';

export default class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackTopic: null,
      canSend: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.FeedbackView}>
        <View style={styles.FeedbackView}>
          <View style={styles.FeedbackView__ContentContainer}>
            <BasicTextInput label="Subject" />
            {/* TODO: this is a prop on the reducer else null */}
            <Text style={{fontSize: 12, marginBottom: 5}}>{'Feedback Topic'}</Text>
            <Picker
              selectedValue={this.state.feedbackTopic}
              itemStyle={{
                height: 40,
                width: 300,
                borderWidth: 1,
                borderColor: Color.LightGrey,
                marginBottom: 20,
                borderRadius: 5,
              }}
              onValueChange={(itemValue, itemIndex) => this.setState({feedbackTopic: itemValue})}>
              <Picker.Item label="--" value={null} />
              <Picker.Item label="Problem With Merchant" value="Problem With Merchant" />
              <Picker.Item label="Problem With Product" value="Problem With Product" />
              <Picker.Item label="Another Issue" value="Another Issue" />
            </Picker>
            <BasicTextAreaInput label="Message" />
            <IconLeftButton
              title="Send"
              buttonStyle={{
                width: 300,
                height: 50,
                borderColor: Color.Pink2,
                borderWidth: 1,
                backgroundColor: Color.White,
                alignItems: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 40,
                marginTop: 20,
                marginBottom: 10,
              }}
              iconColor={Color.Pink2}
              iconName={'send'}
              titleStyle={{
                color: Color.Pink2,
                fontWeight: 'bold',
              }}
              onPress={() => {
                Actions.conversations();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  FeedbackView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FeedbackView__ContentContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
  },
});
