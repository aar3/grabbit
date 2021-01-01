import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import {Color} from 'grabbit/src/Const';

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

export function NewNotificationIcon(focused) {
  return (
    <View>
      <View
        style={{
          backgroundColor: Color.ErrorRed,
          zIndex: 1,
          borderRadius: 100,
          height: 10,
          width: 10,
          position: 'absolute',
        }}></View>
      <Icon name="message-circle" size={20} color={focused ? Color.Purple : Color.ReadableGreyText} />
    </View>
  );
}
