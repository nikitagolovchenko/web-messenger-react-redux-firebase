import { authConstants } from '../actions/constants';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  authenticating: false,
  authenticated: false,
  error: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case `${authConstants.USER_LOGIN}_REQUEST`:
      return {
        ...state,
        authenticating: true,
      };

    case `${authConstants.USER_LOGIN}_SUCCESS`:
      return {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };

    case `${authConstants.USER_LOGIN}_FAILURE`:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
