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
    GetUserDealsPending: 'GetUserDealsPending',
    GetUserDealsSuccess: 'GetUserDealsSuccess',
    GetUserDealsError: 'GetUserDealsError',
    SetFocusedDeal: 'SetFocusedDeal',
    ToggleFocusedDealModal: 'ToggleFocusedDealModal',
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
  },
  Settings: {
    GetUserSettingsPending: 'GetUserSettingsPending',
    GetUserSettingsError: 'GetUserSettingsError',
    GetUserSettingsSuccess: 'GetUserSettingsSuccess',
  },
};
