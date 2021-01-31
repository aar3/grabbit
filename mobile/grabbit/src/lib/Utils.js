import axios from 'axios';
import {DealType} from 'grabbit/src/lib/Const';
import {Alert} from 'react-native';
import Store from 'grabbit/src/lib/Reducer';
import ReduxActions from 'grabbit/src/lib/Actions';
import NotificationService from 'grabbit/src/lib/NotificationService';

export const httpRequest = async function (options) {
  if (!options.endpoint) {
    throw new Error('httpRequest requires endpoint property in options');
  }

  try {
    options.url = 'http://192.168.1.87:8000/api/v1' + options.endpoint;
    console.log(options.method, options.url, options.data, options.headers);
    const {data, status, headers} = await axios(options);
    if (status === 200) {
      return {data};
    } else {
      console.log('Returned non-200: ' + String(status) + JSON.stringify(headers));
      return {
        error: {
          details: 'Returned non-200: ' + String(status),
          statusCode: status,
        },
      };
    }
  } catch (e) {
    console.log('httpRequest: ' + e.toString());
    return {
      error: {
        statusCode: 500,
        details: e.toString(),
      },
    };
  }
};

export const getStateForKey = function (key, state) {
  if (!key || !state) {
    throw new Error('getStateForKey requires valid key and state');
  }
  let curr = state;
  const nodes = key.split('.').slice(1);
  for (let i = 0; i < nodes.length; i++) {
    curr = curr[nodes[i]];
  }
  return curr;
};

export const formatOriginalPrice = function (item) {
  const d = Number(item.deal.discount.substr(1));
  if (d < 1) {
    const x = item.deal.value * d + item.deal.value;
    return Number(x).toFixed(0);
  }

  return Number(item.deal.discount.substr(1)).toFixed(0);
};

export const to12HourTime = function (t) {
  let meridian = 'AM';
  let [hour, minute] = t.split(':');
  if (hour > 12) {
    hour = hour - 12;
    meridian = 'PM';
  }

  return `${parseInt(hour, 10)}:${minute} ${meridian}`;
};

export const httpStateUpdate = async function ({dispatch, options, stateKeyPrefix}) {
  dispatch({
    type: stateKeyPrefix + 'Pending',
  });

  const {data, error} = await httpRequest(options);

  if (error) {
    return dispatch({
      type: stateKeyPrefix + 'Error',
      payload: error,
    });
  }

  return dispatch({
    type: stateKeyPrefix + 'Success',
    payload: data,
  });
};

// IMPORTANT: This is a bit confusing, because not only do we have 3 deal types, but on
// ListDeals we're also tagging is_on_watchlist to deals the deal is in the Watchlist set.
// Ideally this should be cleaned up in the future to remove the hacks
export const getDealType = function (item) {
  if (item.hasOwnProperty('url')) {
    if (item.hasOwnProperty('is_on_watchlist')) {
      return DealType.DerivedWatchList;
    }
    return DealType.Deal;
  }

  if (item.hasOwnProperty('deal')) {
    if (item.hasOwnProperty('is_on_watchlist')) {
      return DealType.Match;
    }
    return DealType.WatchList;
  }
};

class Websocket_ {
  constructor() {
    this.uri = 'ws://localhost:8765';
    this.store = Store;
    this.user = getStateForKey('state.session.user', this.store.getState());
    this.socket = new WebSocket(this.uri);
    this.dispatchToState = this.dispatchToState.bind(this);
    this.notifier = new NotificationService(this.onRegister, this.onNotification);
    this.connected = false;

    console.log(`Initializing Websocket for user: ${this.user.id}`);

    this.socket.onopen = () => {
      console.log(`Web socket client connected at ${this.uri}`);
      this.socket.send(
        JSON.stringify({
          current_session_token: this.user.current_session_token,
        }),
      );

      this.connected = true;
    };

    this.socket.onmessage = ({data}) => {
      const serialized = JSON.parse(data);

      console.log('Just received ', serialized);

      this.dispatchToState({
        type: serialized.redux_action,
        payload: serialized.instance,
      });
    };

    this.socket.onerror = (e) => {
      console.log('Websocket error: ', e.message);
    };

    this.socket.onclose = (e) => {
      console.log('Peer closed connection: ', JSON.stringify(e));
    };
  }

  dispatchToState({type, payload}) {
    if (type === ReduxActions.WebSocket.IncomingNotification) {
      this.notifier.localNotification({title: 'Settings Update', text: "You've updated your account settings"});
    }
    // IMPORTANT: To avoid race conditions where a resource is returned from the API at the same
    // time that a websocket update comes in, we delay the websocket state update for 2 seconds so
    // the API state update can happen first
    setTimeout(() => {
      this.store.dispatch({
        type,
        payload,
      });
    }, 2000);
  }

  send(data = {}) {
    // IMPORTANT: Nothing should ever be sent without a user being set
    data['current_session_token'] = this.user.current_session_token;
    this.socket.send(JSON.stringify(data));
  }

  onNotification(notification) {
    console.log('>>> NOTIFICATION ', notification);
    Alert.alert(notification.title, notification.message);
  }

  onRegister(token) {
    this.store.dispatch({
      type: ReduxActions.Notifications.RegisterIOSNotificationService,
      payload: token,
    });
  }

  handleNotificationPermCheck(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}

export const Websocket = new Websocket_();
