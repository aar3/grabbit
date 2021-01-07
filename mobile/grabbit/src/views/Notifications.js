import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';
import ReduxActions from 'grabbit/src/Actions';
import {getStateForKey, httpRequest} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

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

  async componentDidMount() {
    return this.props.getNotifications(this.options);
  }

  _renderMoreInfoButton(item) {
    if (!item.route_key) {
      return null;
    }
    return (
      <View
        style={{
          // borderColor: 'red',
          // borderWidth: 1,
          width: 25,
          height: 25,
        }}>
        <Icon name={'chevron-right'} size={20} color={!item.seen_at ? Color.Purple : Color.BorderLightGrey} />
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
            fontSize: 12,
            color: Color.Purple,
          }}>
          Just now
        </Text>
      );
    }
    return (
      <Text
        style={{
          fontSize: 12,
          color: Color.BorderLightGrey,
        }}>
        Seen At {item.seen_at.substr(0, 10)}
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
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: Color.Purple,
            }}>
            Doh, looks like there was an error
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: Color.BorderLightGrey,
            }}>
            {this.props.getNotificationsError.details}
          </Text>
          <TouchableOpacity onPress={() => this.props.getNotifications(this.options)}>
            <Icon style={{marginTop: 20}} name={'rotate-ccw'} size={24} color={Color.BorderLightGrey} />
          </TouchableOpacity>
          <Text style={{color: Color.BorderLightGrey, marginTop: 20}}>Try Again</Text>
        </View>
      );
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
              color: Color.Purple,
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 20,
            }}>
            You have no notifications
          </Text>
          <Text style={{color: Color.BorderLightGrey, fontSize: 14, marginBottom: 20}}>For now...</Text>
          <Icon name="thumbs-up" size={20} color={Color.BorderLightGrey} />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={this.props.notifications}
          style={{
            width: '100%',
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
                    backgroundColor: !item.seen_at ? '#f2e9f9' : Color.White,
                    borderBottomWidth: 1,
                    borderBottomColor: !item.seen_at ? Color.Purple : Color.BorderLightGrey,
                    height: 60,
                    width: '100%',
                    flexDirection: 'row',
                    // justifyContent: 'center',
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
                      backgroundColor: !item.seen_at ? Color.White : 'transparent',
                      borderWidth: 1,
                      borderColor: !item.seen_at ? Color.Purple : Color.BorderLightGrey,
                    }}>
                    <Icon name={item.icon} color={Color.Purple} size={20} />
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'blue',
                      width: 280,
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 13,
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
                      <Icon name={'check'} size={15} color={!item.seen_at ? Color.Purple : Color.BorderLightGrey} />
                      {this._renderSeenTag(item)}
                    </View>
                  </View>
                  {this._renderMoreInfoButton(item)}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  const notifications = getStateForKey('state.notifications.list.items', state);
  const sorted = Object.values(notifications).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return {
    user: getStateForKey('state.session.user', state),
    getNotificationsPending: getStateForKey('state.notifications.list.pending', state),
    getNotificationsError: getStateForKey('state.notifications.list.error', state),
    notifications: sorted,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    // Remove the pending state so it doesn't clash with default FlatList loading image
    getNotificationsViaFlatList: async function (options) {
      const {data, error} = await httpRequest(options);

      if (error) {
        return dispatch({
          type: ReduxActions.Notifications.GetNotificationsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Notifications.GetNotificationsSuccess,
        payload: data,
      });
    },
    getNotifications: async function (options) {
      dispatch({
        type: ReduxActions.Notifications.GetNotificationsPending,
      });

      const {data, error} = await httpRequest(options);

      if (error) {
        return dispatch({
          type: ReduxActions.Notifications.GetNotificationsError,
          payload: error,
        });
      }

      return dispatch({
        type: ReduxActions.Notifications.GetNotificationsSuccess,
        payload: data,
      });
    },
    setNotificationsSeen: async function (options) {
      const {error, data} = await httpRequest(options);
      if (error) {
        console.log(`Error setting notifications as seen: ${error.details}`);
        return;
      }

      return dispatch({
        type: ReduxActions.Notifications.GetNotificationsSuccess,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
