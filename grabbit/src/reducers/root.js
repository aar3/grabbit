import {Alert} from 'react-native';

import {Actions} from 'react-native-router-flux';

import ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';

const defaultState = {
  userType: null,
  navigation: {
    currentScene: null,
  },
  broker: {
    session: {
      user: null,
      pending: false,
      error: null,
    },
    currScreen: null,
    brokerDiscover: {
      content: [],
      error: null,
      pending: false,
    },
    productBeingViewed: null,
    merchantBeingViewed: null,

    // if brokers can view other brokers' profiles
    brokerBeingViewed: null,
  },
  merchant: {
    session: {
      user: null,
      pending: false,
      error: null,
    },
    currScreen: null,
    productBeingViewed: null,
    brokerBeingViewed: null,
  },
  match: {
    proposition: {
      error: null,
      pending: false,
      proposedTo: null,
    },
    acceptance: {
      error: null,
      pending: false,
      acceptingFrom: null,
    },
  },
  notifications: {
    pending: false,
    error: null,
    content: [],
  },
};

export const postUserAuth = ({options}) => {
  return async (dispatch) => {
    dispatch({
      type: ACTIONS.SESSION_PENDING,
      data: null,
      error: null,
      pending: true,
    });

    const {data, error} = await httpRequestAsync({options});

    if (error) {
      if (error.details.includes('404')) {
        Alert.alert(
          'Create Account?',
          'No user was found for those credentials.\n\nWould you like to create an account now?',
          [
            {
              text: 'No',
              onPress: () => {
                dispatch({
                  type: ACTIONS.CREATE_ACCT_CANCELLED,
                  user: null,
                  error: null,
                  pending: false,
                });
              },
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                options = {
                  ...options,
                  url: 'http://localhost:8080/api/v1/users/',
                };

                const {data, error} = await httpRequestAsync({options});

                if (error) {
                  return dispatch({
                    type: ACTIONS.SESSION_ERROR,
                    user: null,
                    error: {details: 'Something went wrong on our end'},
                    pending: false,
                  });
                }

                dispatch({
                  type: ACTIONS.SESSION_SUCCESS,
                  user: data,
                  error: null,
                  pending: false,
                });
                Actions.tabStart();
              },
            },
          ],
          {cancelable: false},
        );
        return;
      } else if (error.details.includes('401')) {
        return dispatch({
          type: ACTIONS.SESSION_ERROR,
          user: null,
          error: {details: 'Wrong password for that email'},
          pending: false,
        });
      } else {
        return dispatch({
          type: ACTIONS.SESSION_ERROR,
          user: null,
          error: {details: 'Something went wrong on our end'},
          pending: false,
        });
      }
    }

    dispatch({
      type: ACTIONS.SESSION_SUCCESS,
      user: data,
      error: null,
      pending: false,
    });

    Actions.tabStart();
  };
};

export default mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_TYPE: {
      return {...state, ...action};
    }
    case ACTIONS.SESSION_PENDING:
    case ACTIONS.SESSION_SUCCESS:
    case ACTIONS.SESSION_ERROR:
    case ACTIONS.CREATE_ACCT_CANCELLED:
      return {
        ...state,
        session: {...state.session, ...action},
      };
    case ACTIONS.CLEAR_CURRENT_TITLE:
      return {
        ...state,
        input: {
          ...state.input,
          error: null,
        },
      };
    case ACTIONS.POST_TITLE_SUCCESS:
    case ACTIONS.POST_TITLE_ERROR:
    case ACTIONS.POST_TITLE_PENDING:
      return {
        ...state,
        input: {...state.input, ...action},
      };
    case ACTIONS.GET_USER_TITLE_HISTORY_PENDING:
    case ACTIONS.GET_USER_TITLE_HISTORY_SUCCESS:
    case ACTIONS.GET_USER_TITLE_HISTORY_ERROR:
    case ACTIONS.SET_CURRENT_HISTORY_TITLE:
      return {
        ...state,
        history: {...state.history, ...action},
      };
    default:
      return state;
  }
};
