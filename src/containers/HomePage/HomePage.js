import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../actions/user.actions';
import Layout from '../../components/Layout/Layout';
import styles from './HomePage.scss';

const HomePage = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getRealtimeUsers(auth.uid));
  }, []);

  return (
    <Layout>
      <section className='container'>
        <div className='listOfUsers'>
          {user.users.length > 0
            ? user.users.map((user, index) => {
                return (
                  <div className='displayName' key={index}>
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
                      <span>{user.isOnline ? 'online': 'offline'}</span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className='chatArea'>
          <div className='chatHeader'> Rizwan Khan </div>
          <div className='messageSections'>
            <div style={{ textAlign: 'left' }}>
              <p className='messageStyle'>Hello User</p>
            </div>
          </div>
          <div className='chatControls'>
            <textarea />
            <button>Send</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
