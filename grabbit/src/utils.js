import axios from 'axios';
import Config from 'grabbit/config';

export const httpRequestAsync = async ({options}) => {
  try {
    options.url = Config.Hostname + `/api/${Config.Version}` + options.endpoint;
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
    console.log('httpRequestAsync error: ' + e.toString());
    return {
      error: {
        statusCode: e.response.status,
        details: 'Something unexpected happened :(',
      },
    };
  }
};
