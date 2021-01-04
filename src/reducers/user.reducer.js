import { userConstants } from '../actions/constants';

const initState = {
  users: [],
  conversations: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
      return state;
    case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
      return {
        ...state,
        users: action.payload.users,
      };
    case userConstants.GET_REALTIME_MESSAGES:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    default:
      return state;
  }
};

export default userReducer;
