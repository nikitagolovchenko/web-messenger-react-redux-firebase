import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRealtimeComversations,
  getRealtimeUsers,
  updateMessage,
} from '../../actions/user.actions';
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
          alignItems: 'center',
          margin: '0 10px',
        }}
      >
        <span
          style={{ fontWeight: 500 }}
        >{`${user.firstName} ${user.lastName}`}</span>
        <span className={user.isOnline ? 'user-status online' : 'user-status'}></span>
      </div>
    </div>
  );
};

const HomePage = props => {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
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
    setUserUid(user.uid);

    dispatch(getRealtimeComversations({ uid_1: auth.uid, uid_2: user.uid }));
  };

  const submitMessage = (e) => {
    e.preventDefault();

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage('');
      });
    }
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
            {chatStarted
              ? user.conversations.map(con => (
                  <div
                    style={{
                      textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left',
                    }}
                    key={con.createdAt}
                  >
                    <p className='messageStyle'>{con.message}</p>
                  </div>
                ))
              : null}
          </div>
          {chatStarted ? (
            <form className='chatControls' onSubmit={submitMessage}>
              <input type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='White Message'
              />
              <button type="submit">Send</button>
            </form>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
