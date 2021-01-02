import ReduxActions from 'grabbit/src/Actions';
import {arrayToObject, getStateForKey} from 'grabbit/src/Utils';

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
          secret: '',
          area_code: '',
          prefix: '',
          line_number: '',
        },
        signup: {
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          area_code: '',
          prefix: '',
          line_number: '',
          secret: '',
          user_type: 1,
          invitation_code: '6YQK-3E9Y',
        },
      },
      pending: false,
      error: null,
    },
  },
  rewards: {
    inactive: {},
    list: {
      pending: false,
      error: null,
      items: [],
    },
    focused: null,
  },
  stats: {
    pending: false,
    error: {
      details: 'Whoops something went wrong',
    },
  },
  settings: {
    targeting_disabled: false,
    grabbit_profile_keywords: 'Spender, Luxury, Sports, Active, Enjoys weekend trips, Loves entertainment',
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
    list: {
      pending: false,
      error: null,
      items: {},
    },
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
    // Plaid
    // ********************************************
    case ReduxActions.Plaid.GetUserLinksSuccess: {
      const list = arrayToObject(payload, 'id');
      return {
        ...state,
        plaid: {
          ...state.plaid,
          links: {
            ...state.plaid.links,
            pending: false,
            error: null,
            list,
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
    default: {
      return state;
    }
  }
}
