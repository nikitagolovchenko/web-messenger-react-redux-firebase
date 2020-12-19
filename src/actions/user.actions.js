import { userConstants } from './constants';
import firebase from 'firebase';

export const getRealtimeUsers = uid => {
  return dispatch => {
    dispatch({
      type: `${userConstants.GET_REALTIME_USERS}_REQUEST`,
    });

    const db = firebase.firestore();

    db.collection('users').onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });

      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users },
      });
    });
  };
};
