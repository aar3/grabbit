import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import {getStateForKey} from 'grabbit/src/Utils';
import {ToggleStyle} from 'grabbit/src/Styles';
import {Color} from 'grabbit/src/Const';

const textSection = {
  fontSize: 12,
  marginTop: 20,
  color: Color.ReadableGreyText,
};

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderSupportItems() {
    const {settings} = this.props;
    return settings.support.map((item, index) => {
      return (
        <TouchableOpacity key={String(index)} onPress={() => Actions[item.routeKey]}>
          <View
            key={String(index)}
            style={{
              borderTopWidth: 1,
              alignItems: 'center',
              borderTopColor: Color.BorderLightGrey,
              height: 50,
              width: '100%',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginLeft: 20,
                color: Color.ReadableGreyText,
              }}>
              {item.title}
            </Text>
            <Icon
              style={{
                position: 'absolute',
                right: 20,
              }}
              name={'chevron-right'}
              size={20}
              color={Color.BorderLightGrey}
            />
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const {settings} = this.props;
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: Color.BorderLightGrey,
            width: '90%',
            height: 175,
            flexDirection: 'row',
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'orange',
              width: 275,
            }}>
            <Text
              style={{
                fontSize: 16,
              }}>
              Disable Targeted Advertising
            </Text>
            <Text style={textSection}>
              Completely disable any and all targeted advertising products and services associated with your account, in
              totality.
            </Text>
            <Text style={textSection}>
              This will unlink all of your linked bank accounts,, and you will not continue to receive premium discounts
            </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              marginLeft: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ToggleSwitch
              isOn={settings.targeting_disabled}
              onColor={ToggleStyle.On}
              offColor={ToggleStyle.Off}
              label={null}
              size="small"
              onToggle={() => {}}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 25,
            width: '90%',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: Color.BorderLightGrey,
            borderTopColor: Color.BorderLightGrey,
            // borderWidth: 1,
            // borderColor: 'blue',
          }}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 20,
            }}>
            My Grabbit Advertiser Profile
          </Text>
          <Text style={textSection}>
            Using your financial transaction history we try to responsibly, securely, and privately match you to
            discounts using proprietary technology. Below is a rough idea of the type of profile on you that we’ve built
            using your data.
          </Text>
          <Text style={textSection}>{settings.grabbit_profile_keywords}</Text>
          <Text style={[textSection, {marginBottom: 20}]}>
            Remember, this is a ephemeral profile built using data that changes over time. This data is NOT personally
            identifiable, and as always, your data is safe with us.
          </Text>
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            width: '100%',
            marginTop: 25,
            // borderTopColor: Color.BorderLightGrey,
            // borderTopWidth: 1,
          }}>
          {this._renderSupportItems()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    settings: getStateForKey('state.settings', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
