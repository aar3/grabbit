import ReduxActions from 'grabbit/src/Actions';

// IMPORTANT: all state properties are snake-cased because that's how the python
// api sends data over the wire
const defaultState = {
  session: {
    user: {
      id: 3,
      created_at: '2020-12-28T20:49:15.378923Z',
      updated_at: null,
      deleted_at: null,
      qr_code_url: '',
      name: 'Rashad Alston',
      email: 'rashad.a.alston@gmail.com',
      address_line1: '600 S Spring St',
      address_line2: 'Los Angeles, CA 90014',
      current_session_token: '8f710063cffbe962bcf51aec432aff687acd027e41e52589b63bda1ae9903048',
      phone: '+1 213-222-7624',
    },
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
    list: {
      pending: false,
      error: {
        details: 'Something unexpected happened',
      },
      items: [],
    },
    focused: null,
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
    links: {
      pending: false,
      error: null,
      list: {},
    },
    link_token: {
      pending: false,
      error: null,
      link_token: null,
    },
    show_modal: true,
    update: {
      error: null,
      pending: false,
    },
  },
};

export default function (state = defaultState, action) {
  const {payload, type, key} = action;
  switch (type) {
    // ********************************************
    // Plaid
    // ********************************************
    case ReduxActions.Plaid.GetUserLinksSuccess: {
      const foo = {};
      payload.forEach((item) => {
        foo[item.id] = item;
      });

      return {
        ...state,
        plaid: {
          ...state.plaid,
          links: {
            ...state.plaid.links,
            pending: false,
            error: null,
            list: foo,
          },
        },
      };
    }

    case ReduxActions.Plaid.GetUserLinksError: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          links: {
            ...state.plaid.links,
            pending: false,
            error: payload,
          },
        },
      };
    }

    case ReduxActions.Plaid.GetUserLinksPending: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          links: {
            ...state.plaid.links,
            pending: true,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Plaid.UpdateLinkAccountStatusSuccess: {
      console.log('curr keys ', Object.keys(state.plaid.links.list));
      console.log('>> update for ', payload);
      return {
        ...state,
        plaid: {
          ...state.plaid,
          // Update both the pending state, and the PUT response payload
          links: {
            ...state.plaid.links,
            list: {
              ...state.plaid.links.list,
              [payload.id]: payload,
            },
          },
          update: {
            ...state.plaid.links.update,
            pending: false,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Plaid.UpdateLinkAccountStatusError: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          update: {
            ...state.plaid.links.update,
            pending: false,
            error: payload,
          },
        },
      };
    }

    case ReduxActions.Plaid.UpdateLinkAccountStatusPending: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          update: {
            ...state.plaid.links.update,
            pending: true,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Plaid.HandleLinkTokenSuccess: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          // Index the new account to the accounts object
          links: {
            ...state.plaid.links,
            list: {
              ...state.plaid.links.list,
              [payload.id]: payload,
            },
          },
        },
      };
    }

    case ReduxActions.Plaid.HandleLinkTokenError:
    case ReduxActions.Plaid.GetLinkTokenError: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          link_token: {
            ...state.plaid.link_token,
            pending: false,
            error: payload,
          },
        },
      };
    }

    case ReduxActions.Plaid.GetLinkTokenSuccess: {
      const {token} = payload;
      return {
        ...state,
        plaid: {
          ...state.plaid,
          link_token: {
            ...state.plaid.link_token,
            pending: false,
            error: null,
            link_token: token,
          },
        },
      };
    }

    case ReduxActions.Plaid.GetLinkTokenPending: {
      return {
        ...state,
        plaid: {
          ...state.plaid,
          link_token: {
            ...state.plaid.link_token,
            pending: true,
            error: null,
          },
        },
      };
    }

    // ********************************************
    // RewardsList
    // ********************************************

    case ReduxActions.Rewards.GetUserRewardsError: {
      return {
        ...state,
        rewards: {
          ...state.rewards,
          list: {
            ...state.rewards.list,
            error: payload,
            pending: false,
          },
        },
      };
    }

    case ReduxActions.Rewards.GetUserRewardsSuccess: {
      return {
        ...state,
        rewards: {
          ...state.rewards,
          list: {
            ...state.rewards.list,
            items: payload,
            pending: false,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Rewards.GetUserRewardsPending: {
      return {
        ...state,
        rewards: {
          ...state.rewards,
          list: {
            ...state.rewards.list,
            pending: true,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Rewards.SetFocusedReward: {
      return {
        ...state,
        rewards: {
          ...state.rewards,
          focused: payload,
        },
      };
    }

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
