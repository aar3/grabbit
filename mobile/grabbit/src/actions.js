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
  Rewards: {
    GetUserRewardsPending: 'GetUserRewardsPending',
    GetUserRewardsSuccess: 'GetUserRewardsSuccess',
    GetUserRewardsError: 'GetUserRewardsError',
    SetFocusedReward: 'SetFocusedReward',
  },
  Plaid: {
    GetLinkTokenPending: 'GetLinkTokenPending',
    GetLinkTokenSuccess: 'GetLinkTokenSuccess',
    GetLinkTokenError: 'GetLinkTokenError',

    GetUserLinksPending: 'GetUserLinksPending',
    GetUserLinksError: 'GetUserLinksError',
    GetUserLinksSuccess: 'GetUserLinksSuccess',

    HandleLinkTokenSuccess: 'HandleLinkTokenSuccess',
    HandleLinkTokenError: 'HandleLinkTokenError',

    UpdateLinkAccountStatusPending: 'UpdateLinkAccountStatusPending',
    UpdateLinkAccountStatusSuccess: 'UpdateLinkAccountStatusSuccess',
    UpdateLinkAccountStatusError: 'UpdateLinkAccountStatusError',
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
