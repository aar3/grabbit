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
      endpoint: `/user/${this.props.user.id}/notifications/`,
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
          <Text style={{
            color: Color.BorderLightGrey,
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 20,
          }}>You have no notifications</Text>
          <Icon name='thumbs-down' size={20} color={Color.BorderLightGrey} />
        </View>
      )
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
            keyExtractor={(_item, index) => index.toString()} 
            renderItem={({ item, index }) => {
              return (
                <View style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Color.BorderLightGrey,
                  height: 60,
                  width: '100%',
                  padding: 10,
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <Icon style={{
                    // borderWidth: 1,
                    // borderColor: 'blue',
                    marginLeft: 10,
                  }} name={item.icon} color={Color.BorderLightGrey} size={20} />
                  <Text style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    marginLeft: 20,
                    color: Color.ReadableGreyText
                  }}>{item.text}</Text>
                </View>
              )
            }}
            />
        </View>
    );
  }
}

const mapStateToProps = function (state) {
  const notifications = getStateForKey('state.notifications.list.items', state);
  return {
    user: getStateForKey('state.session.user', state),
    getNotificationsPending: getStateForKey('state.notifications.list.pending', state),
    getNotificationsError: getStateForKey('state.notifications.list.error', state),
    notifications: Object.values(notifications),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
