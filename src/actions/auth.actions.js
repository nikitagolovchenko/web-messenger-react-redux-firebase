import firebase from 'firebase';
import { authConstants } from './constants';

export const signup = (user) => {
  return (dispatch) => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });

    const db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
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
              .add({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
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
              .catch((error) => {
                console.error(error.message);
                dispatch({
                  type: `${authConstants.USER_LOGIN}_FAILURE`,
                  payload: error.message,
                });
              });
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
};
