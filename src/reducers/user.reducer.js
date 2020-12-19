import { userConstants } from '../actions/constants';

const initState = {
  users: [],
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
    default:
      return state;
  }
};

export default userReducer;
