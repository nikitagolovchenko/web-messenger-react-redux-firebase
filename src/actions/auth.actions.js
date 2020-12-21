import firebase from 'firebase';
import { authConstants } from './constants';

export const signup = user => {
  return dispatch => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });

    const db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        // когда пользователь вошел успешно - доступно свойство currentUser:
        const currentUser = firebase.auth().currentUser;
        const name = `${user.firstName} ${user.lastName}`;

        currentUser
          .updateProfile({
            // обновляем пользователя
            displayName: name,
          })
          .then(() => {
            // записываем в бд:
            db.collection('users')
              .doc(data.user.uid) // название документа равно uid
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                // succeful
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };

                // сохраняем в localstorage:
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                console.log('Юзер вошел успешно');

                // сохраняем текущего пользователя в redux:
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: {
                    user: loggedInUser,
                  },
                });
              })
              .catch(error => {
                console.error(error.message);
                dispatch({
                  type: `${authConstants.USER_LOGIN}_FAILURE`,
                  payload: error.message,
                });
              });
          });
      })
      .catch(error => {
        console.error(error.message);
      });
  };
};

export const signin = user => {
  return dispatch => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        const db = firebase.firestore();
        db.collection('users')
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(' ');
            const firstName = name[0];
            const lastName = name[1];
            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            };

            localStorage.setItem('user', JSON.stringify(loggedInUser));

            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: {
                user: loggedInUser,
              },
            });
          })
          .catch(error => {
            console.error(error.message);
          });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: error.message,
        });
      });
  };
};

export const isLoggedInUser = () => {
  return dispatch => {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    if (user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: {
          user,
        },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: 'Login again please',
      });
    }
  };
};

export const logout = uid => {
  return dispatch => {
    dispatch({
      type: `${authConstants.USER_LOGOUT}_REQUEST`,
    });

    const db = firebase.firestore();
    db.collection('users')
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({
              type: `${authConstants.USER_LOGOUT}_SUCCESS`,
            });
          })
          .catch(error => {
            console.error(error.message);
            dispatch({
              type: `${authConstants.USER_LOGOUT}_FAILURE`,
              payload: error.message,
            });
          });
      })
      .catch(error => {
        console.error(error.message);
      });
  };
};
