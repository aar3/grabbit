import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxActions from 'grabbit/src/Actions';

const arrayToObject = function (arr, keyedBy) {
  const obj = {};
  arr.forEach((element) => {
    obj[element[keyedBy]] = element;
  });
  return obj;
};

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
      current_session_token: '8f710063cffbe962bcf51aec432aff687acd027e41e52589b63bda1ae9903048',
      phone: '+12132227624',
    },
    // user: null,
    authentication: {
      input: {
        login: {
          secret: '',
          country_code: '+1',
          phone: '',
        },
        signup: {
          phone: '',
          email: '',
          secret: '',
          country_code: '+1',
          invitation_code: '6YQK-3E9Y',
        },
      },
      pending: false,
      error: null,
    },
  },
  deals: {
    inactive: {},
    list: {
      pending: false,
      error: {
        details: null,
      },
      items: [],
    },
    focused: {
      show_modal: false,
      item: null,
    },
  },
  stats: {
    pending: false,
    error: {
      details: 'Whoops something went wrong',
    },
  },
  settings: {
    profile: {
      keywords: [],
    },
    pending: false,
    error: null,
    support: [
      {
        id: 1,
        title: 'About Grabbit',
        href: 'https://www.grabbithq.com/about',
      },
      {
        id: 2,
        title: 'Terms & Conditions',
        href: 'https://www.grabbithq.com/terms',
      },
      {
        id: 3,
        title: 'Privacy Policy',
        href: 'https://www.grabbithq.com/privacy',
      },
      {
        id: 4,
        title: 'Contact Us',
        href: 'https://www.grabbithq.com/contact',
      },
    ],
  },
  notifications: {
    hasNewNotification: false,
    list: {
      pending: false,
      error: null,
      items: {},
    },
  },
  accounts: {
    plaid: {
      links: {
        pending: false,
        error: null,
        list: {},
      },
      link_token: {
        pending: true,
        error: null,
        link_token: null,
      },
      show_modal: true,
    },
    update: {
      error: null,
      pending: false,
    },
    types: [
      {
        id: 0,
        title: 'Plaid',
        img_url: 'https://d25hn4jiqx5f7l.cloudfront.net/companies/logos/original/plaid_1542702784.jpg',
        description: 'Link your bank account via the Plaid API',
        routeKey: 'plaidAccounts',
      },
    ],
  },
  account: {
    links: [
      {
        id: 0,
        title: 'Link an account',
        icon: 'toggle-right',
        description: 'Link one of your external accounts to your Grabbit profile',
        routeKey: 'accountType',
      },
      {
        id: 1,
        title: 'Settings',
        icon: 'settings',
        description: 'Change your Grabbit account Settings',
        routeKey: 'settings',
      },
      {
        id: 2,
        title: 'Droplist',
        icon: 'bookmark',
        description: 'View your bookmarked deals',
        routeKey: 'bookmarks',
      },
    ],
  },
  ws: {
    connected: false,
    error: null,
  },
};

const reducer = function (state = defaultState, action) {
  const {payload, type, key} = action;
  switch (type) {
    // ********************************************
    // Settings
    // ********************************************
    case ReduxActions.Settings.GetUserSettingsSuccess: {
      return {
        ...state,
        settings: {
          ...state.settings,
          pending: false,
          error: null,
          profile: payload,
        },
      };
    }
    case ReduxActions.Settings.GetUserSettingsError: {
      return {
        ...state,
        settings: {
          ...state.settings,
          pending: false,
          error: payload,
        },
      };
    }

    case ReduxActions.Settings.GetUserSettingsPending: {
      return {
        ...state,
        settings: {
          ...state.settings,
          pending: true,
          error: null,
        },
      };
    }

    // ********************************************
    // Notifications
    // ********************************************
    case ReduxActions.Notifications.GetNotificationsSuccess: {
      const items = arrayToObject(payload, 'id');
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: {
            ...state.notifications.list,
            pending: false,
            error: null,
            items,
          },
        },
      };
    }

    case ReduxActions.Notifications.GetNotificationsError: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: {
            ...state.notifications.list,
            pending: false,
            error: payload,
          },
        },
      };
    }

    case ReduxActions.Notifications.GetNotificationsPending: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: {
            ...state.notifications.list,
            pending: true,
            error: null,
          },
        },
      };
    }

    // ********************************************
    // Stats
    // ********************************************
    case ReduxActions.Stats.GetUserStatsPending: {
      return {
        ...state,
        stats: {
          ...state.stats,
          pending: true,
          error: null,
        },
      };
    }

    case ReduxActions.Stats.GetUserStatsError: {
      return {
        ...state,
        stats: {
          ...state.stats,
          pending: false,
          error: payload,
        },
      };
    }

    case ReduxActions.Stats.GetUserStatsSuccess: {
      return {
        ...state,
        stats: {
          ...state.stats,
          pending: false,
          error: null,
          ...payload,
        },
      };
    }

    // ********************************************
    // Accounts
    // ********************************************
    case ReduxActions.Accounts.DeleteAccountSuccess: {
      const list = state.accounts.plaid.links;
      delete list[payload.id];

      return {
        ...state,
        accounts: {
          ...state.accounts,
          pending: false,
          error: null,
          plaid: {
            ...state.accounts.plaid,
            links: {
              ...state.accounts.plaid.links,
              list,
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.DeleteAccountError: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          pending: false,
          error: payload,
        },
      };
    }

    case ReduxActions.Accounts.DeleteAccountPending: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          pending: true,
          error: null,
        },
      };
    }

    case ReduxActions.Accounts.GetUserLinksSuccess: {
      const list = arrayToObject(payload, 'id');
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            links: {
              ...state.accounts.plaid.links,
              pending: false,
              error: null,
              list,
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.GetUserLinksError: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            links: {
              ...state.accounts.plaid.links,
              pending: false,
              error: payload,
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.GetUserLinksPending: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            links: {
              ...state.accounts.plaid.links,
              pending: true,
              error: null,
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.UpdatePlaidAccountStatusSuccess: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            links: {
              ...state.accounts.plaid.links,
              list: {
                ...state.accounts.plaid.links.list,
                [payload.id]: payload,
              },
            },
          },
          update: {
            ...state.accounts.update,
            pending: false,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Accounts.UpdatePlaidAccountStatusError: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          update: {
            ...state.accounts.update,
            pending: false,
            error: payload,
          },
        },
      };
    }

    case ReduxActions.Accounts.UpdatePlaidAccountStatusPending: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          update: {
            ...state.accounts.update,
            pending: true,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Accounts.HandleLinkTokenSuccess: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            links: {
              ...state.accounts.plaid.links,
              list: {
                ...state.accounts.plaid.links.list,
                [payload.id]: payload,
              },
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.HandleLinkTokenError:
    case ReduxActions.Accounts.GetLinkTokenError: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            link_token: {
              ...state.accounts.plaid.link_token,
              pending: false,
              error: payload,
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.GetLinkTokenSuccess: {
      const {token} = payload;
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            link_token: {
              ...state.accounts.plaid.link_token,
              pending: false,
              error: null,
              link_token: token,
            },
          },
        },
      };
    }

    case ReduxActions.Accounts.GetLinkTokenPending: {
      return {
        ...state,
        accounts: {
          ...state.accounts,
          plaid: {
            ...state.accounts.plaid,
            link_token: {
              ...state.accounts.plaid.link_token,
              pending: true,
              error: null,
            },
          },
        },
      };
    }

    // ********************************************
    // Deals
    // ********************************************
    case ReduxActions.Deals.ToggleFocusedDealModal: {
      const prev = state.deals.focused.show_modal;
      return {
        ...state,
        deals: {
          ...state.deals,
          focused: {
            ...state.deals.focused,
            show_modal: !prev,
          },
        },
      };
    }
    case ReduxActions.Deals.GetUserDealsError: {
      return {
        ...state,
        deals: {
          ...state.deals,
          list: {
            ...state.deals.list,
            error: payload,
            pending: false,
          },
        },
      };
    }

    case ReduxActions.Deals.GetUserDealsSuccess: {
      return {
        ...state,
        deals: {
          ...state.deals,
          list: {
            ...state.deals.list,
            items: payload,
            pending: false,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Deals.GetUserDealsPending: {
      return {
        ...state,
        deals: {
          ...state.deals,
          list: {
            ...state.deals.list,
            pending: true,
            error: null,
          },
        },
      };
    }

    case ReduxActions.Deals.SetFocusedDeal: {
      return {
        ...state,
        deals: {
          ...state.deals,
          focused: {
            ...state.deals.focused,
            item: payload,
            show_modal: true,
          },
        },
      };
    }

    // ********************************************
    // Session
    // ********************************************
    case ReduxActions.Session.PostUserSignupSuccess: {
      return {
        ...state,
        session: {
          ...state.session,
          authentication: {
            ...state.session.authentication,
            pending: false,
            error: null,
          },
          user: payload,
        },
      };
    }
    case ReduxActions.Session.PostUserSignupError: {
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
    case ReduxActions.Session.PostUserSignupPending: {
      return {
        ...state,
        session: {
          ...state.session,
          authentication: {
            ...state.session.authentication,
            pending: true,
            error: null,
          },
        },
      };
    }
    case ReduxActions.Session.UpdateSignupValue: {
      return {
        ...state,
        session: {
          ...state.session,
          authentication: {
            ...state.session.authentication,
            input: {
              ...state.session.authentication.input,
              signup: {
                ...state.session.authentication.input.signup,
                [key]: payload,
              },
            },
          },
        },
      };
    }
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
          authentication: {
            ...state.session.authentication,
            pending: true,
            error: null,
          },
        },
      };
    }
    case ReduxActions.Session.PostUserLoginSuccess: {
      return {
        ...state,
        session: {
          ...state.session,
          user: payload,
          authentication: {
            ...state.session.authentication,
            error: null,
            pending: false,
          },
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
    case ReduxActions.GENERIC_ACTION: {
      console.log('>>>>>> ACTION ', action);
      return state;
    }
    default: {
      return state;
    }
  }
};

export default store = () => createStore(reducer, applyMiddleware(thunk));
