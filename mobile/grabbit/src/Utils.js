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
        statusCode: e.response.status,
        details: 'Something unexpected happened :(',
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
