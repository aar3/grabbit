import REDUX_ACTIONS from 'grabbit/src/actions';

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

  wallet: {
    currentSearchInput: null,
    brands: [],
    getWalletBrandsPending: false,
    getWalletBrandsError: null,
    walletBrands: [],
  },

  session: {
    user: null,
  },

  brokerDiscover: {
    currentBrand: null,
    brandViewSearchInput: null,
    showBrandCampaignModal: false,
    brands: {
      featured: {
        row0: [],
        row1: [],
      },
      all: [],
    },
    currentCampaignCode: {},
    hasCopiedCurrentCampaignCode: false,
    getBrandsPending: false,
    getBrandsError: null,
  },

  accountLinking: {
    instagramLinkPending: true,
    instagramLinkError: null,
    showInstagramAccountLinkModal: false,
    hasInstagramLinked: false,
    instagramEmailInput: null,
    instagramPasswordInput: null,
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
    case REDUX_ACTIONS.CLEAR_CURRENT_CAMPAIGN_CODE_COPIED:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          hasCopiedCurrentCampaignCode: false,
        },
      };
    case REDUX_ACTIONS.CURRENT_CAMPAIGN_CODE_COPIED:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          hasCopiedCurrentCampaignCode: true,
        },
      };
    case REDUX_ACTIONS.CLEAR_ALL_INSTAGRAM_LINK_INPUT:
      return {
        ...state,
        accountLinking: {
          ...state.accountLinking,
          instagramPasswordInput: null,
          instagramEmailInput: null,
        },
      };
    case REDUX_ACTIONS.UPDATE_INSTAGRAM_LINK_PASSWORD_INPUT:
    case REDUX_ACTIONS.UPDATE_INSTAGRAM_LINK_EMAIL_INPUT:
      return {
        ...state,
        accountLinking: {
          ...state.accountLinking,
          [action.key]: action.payload,
        },
      };
    case REDUX_ACTIONS.TOGGLE_INSTAGRAM_LINK_ACCOUNT_MODAL:
      return {
        ...state,
        accountLinking: {
          ...state.accountLinking,
          showInstagramAccountLinkModal: !state.accountLinking.showInstagramAccountLinkModal,
        },
      };
    case REDUX_ACTIONS.SHOW_INSTAGRAM_LINK_ACCOUNT_MODAL:
      return {
        ...state,
        accountLinking: {
          ...state.accountLinking,
          showInstagramAccountLinkModal: true,
        },
      };
    case REDUX_ACTIONS.CLEAR_GET_WALLET_BRANDS_ERROR:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          getWalletBrandsError: null,
        },
      };
    case REDUX_ACTIONS.GET_WALLET_BRANDS_SUCCESS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          getWalletBrandsPending: false,
          walletBrands: action.payload,
        },
      };
    case REDUX_ACTIONS.GET_WALLET_BRANDS_ERROR:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          getWalletBrandsPending: false,
          getWalletBrandsError: action.payload,
        },
      };
    case REDUX_ACTIONS.GET_WALLET_BRANDS_PENDING:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          getWalletBrandsPending: true,
        },
      };
    case REDUX_ACTIONS.SET_CURRENT_CAMPAGIN_CODE:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          currentCampaignCode: action.payload,
        },
      };
    case REDUX_ACTIONS.CLEAR_CURRENT_CAMPAIGN_CODE:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          currentCampaignCode: null,
        },
      };
    case REDUX_ACTIONS.CLEAR_BROKER_GET_BRANDS_ERROR:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          getBrandsError: null,
        },
      };
    case REDUX_ACTIONS.BROKER_GET_BRANDS_PENDING:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          getBrandsPending: true,
        },
      };
    case REDUX_ACTIONS.BROKER_GET_BRANDS_ERROR:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          getBrandsPending: false,
          getBrandsError: action.payload,
        },
      };
    case REDUX_ACTIONS.BROKER_GET_BRANDS_SUCCESS:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          getBrandsPending: false,
          brands: action.payload,
        },
      };
    case REDUX_ACTIONS.TOGGLE_BROKER_BRAND_CAMPAIGN_MODAL:
      return {
        ...state,
        brokerDiscover: {
          ...state.brokerDiscover,
          showBrandCampaignModal: !state.brokerDiscover.showBrandCampaignModal,
        },
      };
    case REDUX_ACTIONS.UPDATE_BROKER_WALLET_VIEW_SEARCH_INPUT:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          currentSearchInput: action.payload,
        },
      };
    case REDUX_ACTIONS.CLEAR_BROKER_WALLET_VIEW_SEARCH_INPUT:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          currentSearchInput: null,
        },
      };
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
        session: {
          ...state.session,
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
