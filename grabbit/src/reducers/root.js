import {Alert} from 'react-native';

import {Actions} from 'react-native-router-flux';

import REDUX_ACTIONS from 'grabbit/src/actions';
import {httpRequestAsync} from 'grabbit/src/utils';

const defaultState = {
  userType: null,
  navigation: {
    currentScene: null,
  },
  currentSceneKey: null,
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
      type: REDUX_ACTIONS.SESSION_PENDING,
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
                  type: REDUX_ACTIONS.CREATE_ACCT_CANCELLED,
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
                    type: REDUX_ACTIONS.SESSION_ERROR,
                    user: null,
                    error: {details: 'Something went wrong on our end'},
                    pending: false,
                  });
                }

                dispatch({
                  type: REDUX_ACTIONS.SESSION_SUCCESS,
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
          type: REDUX_ACTIONS.SESSION_ERROR,
          user: null,
          error: {details: 'Wrong password for that email'},
          pending: false,
        });
      } else {
        return dispatch({
          type: REDUX_ACTIONS.SESSION_ERROR,
          user: null,
          error: {details: 'Something went wrong on our end'},
          pending: false,
        });
      }
    }

    dispatch({
      type: REDUX_ACTIONS.SESSION_SUCCESS,
      user: data,
      error: null,
      pending: false,
    });

    Actions.tabStart();
  };
};

export default mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REDUX_ACTIONS.SET_CURRENT_SCENE_KEY:
    case REDUX_ACTIONS.SET_USER_TYPE: {
      return {...state, ...action};
    }
    case REDUX_ACTIONS.SESSION_PENDING:
    case REDUX_ACTIONS.SESSION_SUCCESS:
    case REDUX_ACTIONS.SESSION_ERROR:
    case REDUX_ACTIONS.CREATE_ACCT_CANCELLED:
      return {
        ...state,
        session: {...state.session, ...action},
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
        input: {...state.input, ...action},
      };
    case REDUX_ACTIONS.GET_USER_TITLE_HISTORY_PENDING:
    case REDUX_ACTIONS.GET_USER_TITLE_HISTORY_SUCCESS:
    case REDUX_ACTIONS.GET_USER_TITLE_HISTORY_ERROR:
    case REDUX_ACTIONS.SET_CURRENT_HISTORY_TITLE:
      return {
        ...state,
        history: {...state.history, ...action},
      };
    default:
      return state;
  }
};
