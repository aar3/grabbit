import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';
import {FakeImage, Color} from 'grabbit/src/const';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  get options() {
    const {user} = this.props;
    return {
      endpoint: `/notifications/${user.id}/`,
      method: 'GET',
      headers: {
        'X-Grabbit-Token': user.session_token_key,
        'Content-Type': 'application/json;charset-utf8',
      },
    };
  }

  componentDidMount() {
    const {getNotifications} = this.props;
    return getNotifications({options: this.options});
  }

  render() {
    const {notifications, getNotifications, hasNewNotification} = this.props;

    if (!notifications.length) {
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
              fontSize: 22,
              color: Color.GreyText,
              marginBottom: 20,
            }}>
            No new notifications
          </Text>
          <TouchableOpacity onPress={getNotifications({options: this.options})}>
            <Icon name="radio" size={30} color={Color.LightGrey} />
          </TouchableOpacity>
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
          data={notifications}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log('notification pressed');
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Color.LightGrey,
                    flexDirection: 'row',
                    width: 400,
                    padding: 10,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'green',
                      borderRadius: 50,
                      height: 50,
                      width: 50,
                      overflow: 'hidden',
                    }}>
                    <Image source={{uri: item.user.profile_image_url}} style={{height: 50, width: 50}} />
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      width: 285,
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.ReadableGreyText,
                      }}>
                      {item.text}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {notifications, session} = state;
  return {
    user: session.user,
    getNotificationsPending: notifications.getNotificationsPending,
    getNotificationsError: notifications.getNotificationsError,
    notifications: notifications.notifications,
    hasNewNotification: notifications.hasNewNotification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: ({options}) => {
      return async () => {
        dispatch({
          type: REDUX_ACTIONS.GET_NOTIFICATIONS_PENDING,
        });

        const {data, error} = await httpRequestAsync({options});

        if (error) {
          return dispatch({
            type: REDUX_ACTIONS.GET_NOTIFICATIONS_ERROR,
            payload: error,
          });
        }

        return dispatch({
          type: REDUX_ACTIONS.GET_NOTIFICATIONS_SUCCESS,
          payload: data,
        });
      };
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
