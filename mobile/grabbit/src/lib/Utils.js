import axios from 'axios';
import {DealType} from 'grabbit/src/lib/Const';

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
  try {
    if (!key || !state) {
      throw new Error('getStateForKey requires valid key and state');
    }
    let curr = state;
    const nodes = key.split('.').slice(1);
    for (let i = 0; i < nodes.length; i++) {
      curr = curr[nodes[i]];
    }
    return curr;
  } catch (e) {
    console.log('>>> STATE KEY ', key);
  }
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

export const objectContainsItem = function (object, itemId) {
  // IMPORTANT: this object argument _must_ have a deal property
  const item = Object.values(object).find((item) => item.deal.id === itemId);
  return [typeof item === 'object', item];
};
