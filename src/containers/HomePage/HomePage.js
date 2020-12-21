import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../actions/user.actions';
import Layout from '../../components/Layout/Layout';
import styles from './HomePage.scss';

const User = props => {
  const { user, onClick } = props;

  return (
    <div onClick={() => onClick(user)} className='displayName'>
      <div className='displayPic'>
        <img
          src='https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg'
          alt=''
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 10px',
        }}
      >
        <span
          style={{ fontWeight: 500 }}
        >{`${user.firstName} ${user.lastName}`}</span>
        <span>{user.isOnline ? 'online' : 'offline'}</span>
      </div>
    </div>
  );
};

const HomePage = props => {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  let unsubscribe;

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then(unsubscribe => {
        return unsubscribe;
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      unsubscribe.then(f => f()).catch(error => console.error(error.message));
    };
  }, []);

  const initChat = user => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
  };

  return (
    <Layout>
      <section className='container'>
        <div className='listOfUsers'>
          {user.users.length > 0
            ? user.users.map(user => {
                return <User key={user.uid} user={user} onClick={initChat} />;
              })
            : null}
        </div>

        <div className='chatArea'>
          <div className='chatHeader'>{chatStarted ? chatUser : ''}</div>
          <div className='messageSections'>
            {chatStarted ? (
              <div style={{ textAlign: 'left' }}>
                <p className='messageStyle'>Hello User</p>
              </div>
            ) : null}
          </div>
          {chatStarted ? (
            <div className='chatControls'>
              <textarea />
              <button>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
