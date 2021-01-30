import {Alert} from 'react-native';
import Store from 'grabbit/src/Reducer';
import ReduxActions from 'grabbit/src/lib/Actions';
import NotificationService from 'grabbit/src/lib/NotificationService';

class WebSocket_ {
  constructor() {
    this.uri = 'ws://localhost:8765';
    this.store = Store;
    this.user = getStateForKey('state.session.user', this.store.getState());
    this.socket = new WebSocket(this.uri);
    this.dispatchToState = this.dispatchToState.bind(this);
    this.notifier = new NotificationService(this.onRegister.bind(this), this.onNotification.bind(this));
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
      console.log('Peer closed connection: ', e.code, ' ', e.reason);
    };
  }

  dispatchToState({type, payload}) {
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

export default WebSocket = new WebSocket_();
