import axios from 'axios';
import Config from 'grabbit/config';

export const httpRequestAsync = async ({options}) => {
  try {
    options.url = Config.Hostname + `/api/${Config.Version}` + options.endpoint;
    const {data, status, headers} = await axios(options);
    if (status === 200) {
      return {data};
    } else {
      console.log(`Returned non-200 (${status}) ` + JSON.stringify(headers));
      return {
        error: {
          details: `Returned non-200: ${status}`,
        },
      };
    }
  } catch (e) {
    console.log('Network error: ' + e.toString());
    return {
      error: {
        details: 'Network error',
      },
    };
  }
};
