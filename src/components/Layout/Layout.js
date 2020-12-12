import React from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
    </div>
  );
};

export default Layout;
