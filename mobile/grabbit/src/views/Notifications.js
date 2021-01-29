import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {Color, PLACEHOLDER_IMG} from 'grabbit/src/Const';
import {ErrorView} from 'grabbit/src/components/Basic';
import {httpStateUpdate} from 'grabbit/src/Utils';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get options() {
    return {
      endpoint: `/users/${this.props.user.id}/notifications/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': this.props.user.current_session_token,
      },
    };
  }

  componentDidMount() {
    return this.getAndSetNotifications();
  }

  getAndSetNotifications() {
    return httpStateUpdate({
      dispatch: this.props.dispatch,
      options: {
        endpoint: `/users/${this.props.user.id}/get_and_set_notifications`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Session-Token': this.props.user.current_session_token,
        },
      },
      stateKeyPrefix: 'GetNotifications',
    });
  }

  _renderActionButton(item) {
    if (!item.route_key) {
      return null;
    }

    if (item.route_key === 'dealFocus') {
      return (
        <View
          style={{
            // borderColor: 'red',
            // borderWidth: 1,
            width: 75,
            height: 40,
            marginLeft: 5,
          }}>
          <Button
            buttonStyle={{
              backgroundColor: Color.GreyBlue,
              borderRadius: 10,
            }}
            containerStyle={{
              width: 75,
              height: 40,
            }}
            title="Grab It"
            titleStyle={{
              color: Color.White,
              fontWeight: '600',
              fontSize: 12,
            }}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          // borderColor: 'red',
          // borderWidth: 1,
          width: 25,
          height: 25,
          marginLeft: 40,
        }}>
        <Icon name={'chevron-right'} size={15} color={Color.ReadableGreyText} />
      </View>
    );
  }

  _onRefresh() {
    return this.props.getNotificationsViaFlatList(this.options);
  }

  _renderSeenTag(item) {
    if (!item.seen_at) {
      return (
        <Text
          style={{
            fontSize: 11,
            color: Color.ReadableGreyText,
          }}>
          Just now
        </Text>
      );
    }
    const time = item.seen_at.substr(0, 10);
    return (
      <Text
        style={{
          fontSize: 10,
          color: Color.ReadableGreyText,
          marginLeft: 5,
        }}>
        {time}
      </Text>
    );
  }

  render() {
    if (this.props.getNotificationsPending) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Color.BorderLightGrey,
            }}>
            Fetching notifications...
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

    if (this.props.getNotificationsError) {
      return <ErrorView error={this.props.getNotificationsError} onTryAgain={() => this.getAndSetNotifications()} />;
    }

    if (this.props.notifications.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Color.GreyBlue,
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 20,
            }}>
            You have no notifications
          </Text>
          <Text
            style={{
              color: Color.BorderLightGrey,
              fontSize: 14,
              marginBottom: 20,
            }}>
            For now...
          </Text>
          <Icon name="thumbs-up" size={20} color={Color.BorderLightGrey} />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: Color.TopNavBackground,
          // borderWidth: 1,
          // borderColor: 'blue',
        }}>
        <FlatList
          data={this.props.notifications}
          style={{
            width: '100%',
            backgroundColor: Color.TopNavBackground,
            // borderWidth: 1,
            // borderColor: 'red',
            maxHeight: '85%',
          }}
          refreshing={this.props.getNotificationsPending}
          onRefresh={() => this._onRefresh()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (item.route_key) {
                    // TODO: pass item.metadata along as well
                    return Actions[item.route_key]();
                  }
                }}>
                <View
                  style={{
                    backgroundColor: Color.White,
                    padding: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: Color.BorderLightGrey,
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      width: 40,
                      borderRadius: 100,
                      marginLeft: 20,
                      backgroundColor: Color.White,
                      borderWidth: 1,
                      borderColor: Color.BorderLightGrey,
                    }}>
                    <Icon name={item.icon} color={Color.OceanBlue} size={20} />
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'blue',
                      width: 225,
                      marginLeft: 20,
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        fontWeight: '400',
                        color: Color.ReadableGreyText,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        marginTop: 3,
                        fontSize: 11,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.text}
                    </Text>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'red',
                        marginTop: 5,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Icon name={'check'} size={15} color={Color.Teal} />
                      {this._renderSeenTag(item)}
                    </View>
                  </View>
                  {this._renderActionButton(item)}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            marginTop: 20,
            height: 45,
            width: 200,
          }}>
          <Image
            source={require('./../../assets/imgs/Grabbit_Grey_Letters_222x1000.png')}
            style={{flex: 1, height: undefined, width: undefined}}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const notifications = getStateForKey('state.notifications.list.items', state);
  const orderedNotifications = Object.values(notifications).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

  return {
    user: getStateForKey('state.session.user', state),
    getNotificationsPending: getStateForKey('state.notifications.list.pending', state),
    getNotificationsError: getStateForKey('state.notifications.list.error', state),
    notifications: orderedNotifications,
  };
};

export default connect(mapStateToProps, null)(V);
