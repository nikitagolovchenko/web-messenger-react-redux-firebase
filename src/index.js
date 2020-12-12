import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store/store';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCZ8QfhZRo27AXdEkz64kR5pwElWRHJ9BA',
  authDomain: 'web-messenger-4150f.firebaseapp.com',
  projectId: 'web-messenger-4150f',
  storageBucket: 'web-messenger-4150f.appspot.com',
  messagingSenderId: '186560466119',
  appId: '1:186560466119:web:224780669024ccadbcc2e2',
  measurementId: 'G-XGH6B03XWM',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
