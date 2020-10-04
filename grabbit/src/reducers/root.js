import {Alert} from 'react-native';

import {Actions} from 'react-native-router-flux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';

const defaultState = {
  userType: null,

  login: {
    // TDOO: in the future we can validate on a per-input basis
    responseError: false,
    invalidEmailValue: false,
    invalidPasswordValue: false,
    pending: false,
    emailValue: null,
    passwordValue: null,
  },

  navigation: {
    currentScene: null,
  },

  currentSceneKey: null,

  session: {
    user: null,
  },

  brokerDiscover: {
    currentBrand: null,
    brandViewSearchInput: null,
  },

  messages: {
    hasNewMessage: true,
    unsentMessages: [],
    currentConversation: null,
    currentMessages: [],
    postMessagePending: false,
    postMessageError: null,
    getMessagesPending: false,
    getMessagesError: null,
  },

  conversations: {
    currentConversation: null,
    conversations: [],
  },

  notifications: {
    hasNewNotification: false,
    notifications: [],
    getNotificationsPending: true,
    getNotificationsError: null,
  },

  productInfo: {
    currentProduct: null,
    currentProductHasLike: false,
    showDetailsModalForBroker: false,
    showDetailsModalForMerchant: false,
    canGrabCurrentProduct: false,
  },
};

export default mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REDUX_ACTIONS.CLEAR_BROKER_BRAND_VIEW_SEARCH_INPUT:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          brandViewSearchInput: null,
        },
      };
    case REDUX_ACTIONS.UPDATE_BROKER_BRAND_VIEW_SEARCH_INPUT:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          brandViewSearchInput: action.payload,
        },
      };
    case REDUX_ACTIONS.CLEAR_GET_CONVERSATIONS_ERROR:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          getConversationsError: null,
        },
      };
    case REDUX_ACTIONS.GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          getConversationsPending: false,
          conversations: action.payload,
        },
      };
    case REDUX_ACTIONS.GET_CONVERSATIONS_ERROR:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          getConversationsPending: false,
          getConversationsError: action.payload,
        },
      };
    case REDUX_ACTIONS.GET_CONVERSATIONS_PENDING:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          getConversationsPending: true,
        },
      };
    case REDUX_ACTIONS.GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          getNotificationsPending: true,
        },
      };
    case REDUX_ACTIONS.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          getNotificationsError: null,
          getNotificationsPending: false,
          notifications: action.payload,
        },
      };
    case REDUX_ACTIONS.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          getNotificationsPending: false,
          getNotificationsError: action.payload,
        },
      };
    case REDUX_ACTIONS.CLEAR_POST_LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          error: null,
        },
      };
    case REDUX_ACTIONS.POST_USER_LOGIN_PENDING:
      return {
        ...state,
        login: {
          ...state.login,
          pending: true,
        },
      };
    case REDUX_ACTIONS.POST_USER_LOGIN_ERROR:
      // console.log(state.login);
      return {
        ...state,
        login: {
          ...state.login,
          pending: false,
          error: action.payload,
        },
      };
    case REDUX_ACTIONS.POST_USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          pending: false,
        },
        auth: {
          ...state.auth,
          user: action.payload,
        },
      };
    case REDUX_ACTIONS.UPDATE_LOGIN_EMAIL:
    case REDUX_ACTIONS.UPDATE_LOGIN_PASSWORD:
      return {
        ...state,
        login: {
          ...state.login,
          [action.payload.key]: action.payload.text,
        },
      };
    case REDUX_ACTIONS.UPDATE_CURRENT_MESSAGE_TEXT:
      return {
        ...state,
        chat: {
          ...state.chat,
          currentMessageText: action.payload,
        },
      };
    case REDUX_ACTIONS.SET_CURRENT_SCENE_KEY:
    case REDUX_ACTIONS.SET_USER_TYPE:
      return {
        ...state,
        ...action.payload,
      };
    case REDUX_ACTIONS.PRODUCT_INFO_LIKE:
      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          currentProductHasLike: !state.productInfo.currentProductHasLike,
        },
      };
    case REDUX_ACTIONS.TOGGLE_BROKER_PRODUCT_DETAILS_MODAL:
      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          showDetailsModalForBroker: !state.productInfo.showDetailsModalForBroker,
        },
      };
    case REDUX_ACTIONS.SESSION_PENDING:
    case REDUX_ACTIONS.SESSION_SUCCESS:
    case REDUX_ACTIONS.SESSION_ERROR:
    case REDUX_ACTIONS.CREATE_ACCT_CANCELLED:
      return {
        ...state,
        session: {
          ...state.session,
          ...action.payload,
        },
      };
    case REDUX_ACTIONS.CLEAR_CURRENT_TITLE:
      return {
        ...state,
        input: {
          ...state.input,
          error: null,
        },
      };
    case REDUX_ACTIONS.POST_TITLE_SUCCESS:
    case REDUX_ACTIONS.POST_TITLE_ERROR:
    case REDUX_ACTIONS.POST_TITLE_PENDING:
      return {
        ...state,
        input: {
          ...state.input,
          ...action.payload,
        },
      };
    case REDUX_ACTIONS.GET_USER_TITLE_HISTORY_PENDING:
    case REDUX_ACTIONS.GET_USER_TITLE_HISTORY_SUCCESS:
    case REDUX_ACTIONS.GET_USER_TITLE_HISTORY_ERROR:
    case REDUX_ACTIONS.SET_CURRENT_HISTORY_TITLE:
      return {
        ...state,
        history: {
          ...state.history,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
