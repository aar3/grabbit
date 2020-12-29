export default {
  GENERIC_ACTION: 'GENERIC_ACTION',
  Session: {
    UpdateLoginValue: 'UpdateLoginValue',
    PostUserLoginPending: 'PostUserLoginPending',
    PostUserLoginSuccess: 'PostUserLoginSuccess',
    PostUserLoginError: 'PostUserLoginError',
    ResetAuthError: 'ResetAuthError',
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
};
