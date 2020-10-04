import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {styles} from 'grabbit/src/components/navigation/BasicTopNavigation';
import {Color} from 'grabbit/src/const';

class DiscoverTopNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {hasNewMessage} = this.props;
    // const messageIconColor = hasNewMessage ? Color.Pink2 : Color.LightGrey;
    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__LeftContent}>{null}</View>
        <View style={styles.BasicTopNavigation__ContentContainer__CenterContent}>
          <TouchableOpacity onPress={null}>
            <Icon name="map" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.BasicTopNavigation__ContentContainer__RightContent}>
          <TouchableOpacity onPress={() => Actions.conversationsView()}>
            <Icon name="send" size={20} color={Color.LightGrey} />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {messages} = state;
  return {
    hasNewMessage: messages.hasNewMessage,
  };
};

export default connect(mapStateToProps)(DiscoverTopNavigation);
