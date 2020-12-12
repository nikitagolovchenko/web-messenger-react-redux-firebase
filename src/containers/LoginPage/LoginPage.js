import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/UI/Card/Card';
import './LoginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout>
      <div className='loginContainer'>
        <Card>
          <form>
            <input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
