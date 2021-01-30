import React from 'react';
import {View, Text, TouchableOpacity, Linking, ImageBackground} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/lib/Actions';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import {getStateForKey, httpRequest} from 'grabbit/src/lib/Utils';
import {ToggleStyle} from 'grabbit/src/Styles';
import {Color} from 'grabbit/src/lib/Const';

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

  async componentDidMount() {
    return this.props.getUserSettings(this.options);
  }

  get options() {
    return {
      method: 'GET',
      endpoint: `/users/${this.props.user.id}/settings/`,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  _renderSupportItems() {
    return this.props.supportItems.map((item, index) => {
      return (
        <TouchableOpacity key={String(index)} onPress={() => Linking.openURL(item.href)}>
          <View
            key={String(index)}
            style={{
              borderTopWidth: 1,
              alignItems: 'center',
              borderTopColor: Color.BorderLightGrey,
              backgroundColor: Color.White,
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
    if (this.props.getUserSettingsPending) {
      return (
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: Color.BorderLightGrey,
            }}>
            Loading settings...
          </Text>
          <ImageBackground
            source={require('./../../assets/imgs/Loading-Transparent-Cropped.gif')}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              marginTop: 20,
              height: 50,
              width: 50,
              marginBottom: 20,
            }}></ImageBackground>
        </View>
      );
    }

    if (this.props.getUserSettingsError) {
      return (
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: Color.ReadableGreyText,
            }}>
            Doh, looks like there was an error
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: Color.BorderLightGrey,
            }}>
            {this.props.getUserSettingsError.details}
          </Text>
          <TouchableOpacity onPress={() => this.props.getUserSettings(this.options)}>
            <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.BorderLightGrey} />
          </TouchableOpacity>
          <Text style={{color: Color.BorderLightGrey}}>Try Again</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Color.BorderLightGrey,
            width: '100%',
            padding: 20,
            height: 175,
            flexDirection: 'row',
            backgroundColor: Color.White,
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'orange',
              width: 300,
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
              marginLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ToggleSwitch
              isOn={Boolean(this.props.profile.targeting_enabled)}
              onColor={ToggleStyle.On}
              offColor={ToggleStyle.Off}
              label={null}
              size="medium"
              onToggle={() => {
                return this.props.updateUserSettings({
                  endpoint: `/users/${this.props.user.id}/settings/${this.props.profile.id}/`,
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Token': this.props.user.current_session_token,
                  },
                  data: Object.assign({}, this.props.profile, {
                    targeting_enabled: this.props.profile.targeting_enabled === 1 ? 0 : 1,
                  }),
                });
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 25,
            width: '100%',
            padding: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: Color.BorderLightGrey,
            borderTopColor: Color.BorderLightGrey,
            // borderWidth: 1,
            // borderColor: 'blue',
            backgroundColor: Color.White,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            My Grabbit Advertiser Profile
          </Text>
          <Text style={textSection}>
            Using your financial transaction history we try to responsibly, securely, and privately match you to
            discounts using proprietary technology. Below is a rough idea of the type of profile on you that we’ve built
            using your data.
          </Text>
          <Text
            style={[
              textSection,
              {
                color: Color.LessReadableGreyText,
              },
            ]}>
            {this.props.profile.keywords.join(', ')}
          </Text>
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
    getUserSettingsPending: getStateForKey('state.settings.pending', state),
    getUserSettingsError: getStateForKey('state.settings.error', state),
    supportItems: getStateForKey('state.settings.support', state),
    profile: getStateForKey('state.settings.profile', state),
    user: getStateForKey('state.session.user', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    getUserSettings: async function (options) {
      dispatch({
        type: ReduxActions.Settings.GetUserSettingsPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        return dispatch({
          type: ReduxActions.Settings.GetUserSettingsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Settings.GetUserSettingsSuccess,
        payload: data,
      });
    },

    updateUserSettings: async function (options) {
      const {data, error} = await httpRequest(options);

      if (error) {
        console.log(`Couldn\'t update user settings: ${error.details}`);
        return;
      }

      return dispatch({
        type: ReduxActions.Settings.GetUserSettingsSuccess,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
