import axios from 'axios';
import Config from 'grabbit/config.dev';

export const httpRequest = async ({options}) => {
  if (!options.endpoint) {
    throw new Error('httpRequest requires endpoint property in options');
  }

  try {
    options.url = 'http://' + Config.Hostname + '/api/v1' + options.endpoint;
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
    console.log('httpRequest error: ' + e.toString());
    return {
      error: {
        statusCode: e.response.status,
        details: 'Something unexpected happened :(',
      },
    };
  }
};
