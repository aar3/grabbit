import axios from 'axios';

export const httpRequest = async function (options) {
  if (!options.endpoint) {
    throw new Error('httpRequest requires endpoint property in options');
  }

  try {
    options.url = 'http://192.168.1.87:8000/api/v1' + options.endpoint;
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

export function arrayToObject(arr, keyedBy) {
  const obj = {};
  arr.forEach((element) => {
    obj[element[keyedBy]] = element;
  });
  return obj;
}

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

export class Websocket_ {
  constructor() {
    this.uri = 'ws://localhost:8765';
    this.user = null;
    this.connected = false;
  }

  initWithUser(user) {
    this.user = user;

    console.log(`Initializing Websocket with user: ${this.user}`);

    this.socket = new WebSocket(this.uri);
    this.socket.onopen = () => {
      console.log(`Web socket client connected at ${this.uri}`);
      this.socket.send(
        JSON.stringify({
          current_session_token: this.user.current_session_token,
        }),
      );

      this.connected = true;
    };

    this.socket.onmessage = (e) => {
      console.log('Just received ', e.data);
      this.dispatchToState(e.data);
    };

    this.socket.onerror = (e) => {
      console.log('Websocket error: ', e.message);
    };

    this.socket.onclose = (e) => {
      console.log('Peer closed connection: ', e.code, ' ', e.reason);
    };
  }

  dispatchToState(data = {}) {
    console.log('>>>> dispatching ', data, ' to state');
  }

  send(data = {}) {
    // IMPORTANT: Nothing should ever be sent without a user being set
    data['current_session_token'] = this.user.current_session_token;
    this.socket.send(JSON.stringify(data));
  }
}

export const Websocket = new Websocket_();
