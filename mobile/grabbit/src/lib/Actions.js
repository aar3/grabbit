export default {
  GENERIC_ACTION: 'GENERIC_ACTION',
  Session: {
    UpdateLoginValue: 'UpdateLoginValue',
    UpdateSignupValue: 'UpdateSignupValue',

    PostUserLoginPending: 'PostUserLoginPending',
    PostUserLoginSuccess: 'PostUserLoginSuccess',
    PostUserLoginError: 'PostUserLoginError',
    ResetAuthError: 'ResetAuthError',

    PostUserSignupPending: 'PostUserSignupPending',
    PostUserSignupError: 'PostUserSignupError',
    PostUserSignupSuccess: 'PostUserSignupSuccess',
  },
  Deals: {
    IncrementDealsPage: 'IncrementDealsPage',
    GetDealsPending: 'GetDealsPending',
    GetDealsError: 'GetDealsError',
    GetDealsSuccess: 'GetDealsSuccess',

    IncrementMatchedDealsPage: 'IncrementMatchedDealsPage',

    GetMatchedDealsPending: 'GetMatchedDealsPending',
    GetMatchedDealsSuccess: 'GetMatchedDealsSuccess',
    GetMatchedDealsError: 'GetMatchedDealsError',

    SetFocusedDeal: 'SetFocusedDeal',

    ToggleFocusedDealModal: 'ToggleFocusedDealModal',

    UpdateWatchListItemPending: 'UpdateWatchListItemPending',
    UpdateWatchListItemError: 'UpdateWatchListItemError',
    UpdateWatchListItemSuccess: 'UpdateWatchListItemSuccess',

    GetWatchListPending: 'GetWatchListPending',
    GetWatchListSuccess: 'GetWatchListSuccess',
    GetWatchListError: 'GetWatchListError',

    PostToWatchListPending: 'PostToWatchListPending',
    PostToWatchListError: 'PostToWatchListError',
    PostToWatchListSuccess: 'PostToWatchListSuccess',

    DeleteFromWatchListPending: 'DeleteFromWatchListPending',
    DeleteFromWatchListError: 'DeleteFromWatchListError',
    DeleteFromWatchListSuccess: 'DeleteFromWatchListSuccess',
  },
  Accounts: {
    GetLinkTokenPending: 'GetLinkTokenPending',
    GetLinkTokenSuccess: 'GetLinkTokenSuccess',
    GetLinkTokenError: 'GetLinkTokenError',

    GetUserLinksPending: 'GetUserLinksPending',
    GetUserLinksError: 'GetUserLinksError',
    GetUserLinksSuccess: 'GetUserLinksSuccess',

    HandleLinkTokenSuccess: 'HandleLinkTokenSuccess',
    HandleLinkTokenError: 'HandleLinkTokenError',

    UpdatePlaidAccountStatusPending: 'UpdatePlaidAccountStatusPending',
    UpdatePlaidAccountStatusSuccess: 'UpdatePlaidAccountStatusSuccess',
    UpdatePlaidAccountStatusError: 'UpdatePlaidAccountStatusError',

    DeleteAccountPending: 'DeleteAccountPending',
    DeleteAccountSuccess: 'DeleteAccountSuccess',
    DeleteAccountError: 'DeleteAccountError',
  },

  Stats: {
    GetUserStatsPending: 'GetUserStatsPending',
    GetUserStatsError: 'GetUserStatsError',
    GetUserStatsSuccess: 'GetUserStatsSuccess',
  },

  Notifications: {
    GetNotificationsPending: 'GetNotificationsPending',
    GetNotificationsError: 'GetNotificationsError',
    GetNotificationsSuccess: 'GetNotificationsSuccess',
    RegisterIOSNotificationService: 'RegisterIOSNotificationService',
  },
  Settings: {
    GetUserSettingsPending: 'GetUserSettingsPending',
    GetUserSettingsError: 'GetUserSettingsError',
    GetUserSettingsSuccess: 'GetUserSettingsSuccess',
  },
  WebSocket: {
    IncomingNotification: 'IncomingNotification',
  },
};
