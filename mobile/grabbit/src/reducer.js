import ReduxActions from 'grabbit/src/Actions';

// IMPORTANT: all state properties are snake-cased because that's how the python
// api sends data over the wire
const defaultState = {
  session: {
    user: null,
    authentication: {
      input: {
        login: {
          phone: null,
          secret: null,
        },
        signup: {
          name: null,
          email: null,
          username: null,
          address_line1: null,
          address_line2: null,
          phone: null,
          secret: null,
          user_type: 1,
          invitation_code: null,
        },
      },
      pending: false,
      error: null,
    },
  },
  rewards: {
    inactive: [
      {
        id: 1,
        description: '15% off purchase off select purchase of Nike Urban Fit',
        expiry: '1/12/2021',
        code: 'NIKE-CFX13M',
        qr_code_url:
          'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        merchant: {
          image_url: 'https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg',
          name: 'Nike',
          alternative_name: 'Nike Corporation',
          primary_color: '#000',
        },
      },
      {
        id: 2,
        description: "10% off men's tops from with purchase of $50 or more",
        expiry: '2/21/2021',
        code: 'SUPR-AG78E',
        qr_code_url:
          'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        merchant: {
          image_url: 'https://ak.picdn.net/shutterstock/videos/1032859976/thumb/10.jpg',
          name: 'Supreme',
          primary_color: '#CF0F0F',
          alternative_name: 'Vivandi Group Intl.',
        },
      },
    ],
    list: [
      {
        id: 1,
        description: '15% off purchase off select purchase of Nike Urban Fit',
        expiry: '1/12/2021',
        code: 'NIKE-CFX13M',
        qr_code_url:
          'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        merchant: {
          image_url: 'https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg',
          name: 'Nike',
          alternative_name: 'Nike Corporation',
          primary_color: '#000',
        },
      },
      {
        id: 2,
        description: "10% off men's tops from with purchase of $50 or more",
        expiry: '2/21/2021',
        code: 'SUPR-AG78E',
        qr_code_url:
          'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        merchant: {
          image_url: 'https://ak.picdn.net/shutterstock/videos/1032859976/thumb/10.jpg',
          name: 'Supreme',
          primary_color: '#CF0F0F',
          alternative_name: 'Vivandi Group Intl.',
        },
      },
    ],
    focused: {
      id: 1,
      code: 'NIKE-CFX13M',
      description: '15% off purchase off select purchase of Nike Urban Fit',
      expiry: '1/12/2021',
      qr_code_url:
        'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
      merchant: {
        image_url: 'https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg',
        name: 'Nike',
        alternative_name: 'Nike Corporation',
        primary_color: '#000',
      },
    },
  },
  stats: {
    total_spend: '814.73',
    avg_discount: 0.2,
    time_elapsed: 30,
    conversions: 15,
    impressions: 19,
    unique_merchants: 12,
    top_merchant: {
      name: 'Supreme Brands',
      conversions: 3,
      impressions: 6,
      total_spend: 320.12,
      avg_discount: 0.3,
    },
    missed_opportunities: {
      expiries: 3,
      time_elapsed: 7,
      potential_spend: 200.5,
      avg_discount: 0.25,
    },
  },
  settings: {
    targeting_disabled: false,
    grabbit_profile_keywords: 'Spender, Luxury, Sports, Active, Enjoys weekend trips, Loves entertainment',
    support: [
      {
        id: 1,
        title: 'About Grabbit',
        routeKey: 'about',
      },
      {
        id: 2,
        title: 'Terms & Conditions',
        routeKey: 'terms',
      },
      {
        id: 3,
        title: 'Privacy Policy',
        routeKey: 'privacy',
      },
      {
        id: 4,
        title: 'Contact Us',
        routeKey: 'contact',
      },
    ],
  },
  plaid: {
    accounts: {
      show_modal: true,
      current_linktoken: null,
      current_publickey: null,
      list: {
        1: {
          id: 1,
          active: true,
          institution: 'Captial One Bank',
          last_updated: '03/26/2019',
          account_number: 'XXXX8192',
        },
        2: {
          id: 2,
          active: true,
          institution: 'J.P. Morgan Chase',
          last_updated: '04/21/2019',
          account_number: 'XXXX8194411',
        },
        3: {
          id: 3,
          active: false,
          institution: 'Golden Banc of California',
          deactivated_since: '12/26/2020',
          last_updated: '12/01/2019',
          account_number: 'XXXX819212',
        },
      },
    },
  },
};

export default function (state = defaultState, action) {
  const {payload, type, key} = action;
  switch (type) {
    // ********************************************
    // Session
    // ********************************************

    case ReduxActions.Session.ResetAuthError: {
      return {
        ...state,
        session: {
          ...state.session,
          authentication: {
            ...state.session.authentication,
            error: null,
          },
        },
      };
    }
    case ReduxActions.Session.UpdateLoginValue: {
      return {
        ...state,
        session: {
          ...state.session,
          authentication: {
            ...state.session.authentication,
            input: {
              ...state.session.authentication.input,
              login: {
                ...state.session.authentication.input.login,
                [key]: payload,
              },
            },
          },
        },
      };
    }
    case ReduxActions.Session.PostUserLoginPending: {
      return {
        ...state,
        session: {
          ...state.session,
          pending: true,
          error: null,
        },
      };
    }
    case ReduxActions.Session.PostUserLoginSuccess: {
      return {
        ...state,
        session: {
          ...state.session,
          pending: false,
          error: null,
          user: payload,
        },
      };
    }
    case ReduxActions.Session.PostUserLoginError: {
      return {
        ...state,
        session: {
          ...state.session,
          authentication: {
            ...state.session.authentication,
            pending: false,
            error: payload,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
