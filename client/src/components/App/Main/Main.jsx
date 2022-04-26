import React, { useState, useEffect } from 'react';
import './Main.scss';
import { Navigate, useParams } from 'react-router-dom';
import Contacts from './Contacts';
import Chat from './Chat';

function Main() {
  const params = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  // if (!user) {
  // 	return <Navigate to='/messenger/account/login' />;
  // }

  return (
    <div className="main" id="main">
      {/* left part for contacts  */}
      <div className="main__left" id="left">
        <Contacts />
      </div>
      {/* right part for chat room */}
      <div className="main__right" id="right">
        {params.user ? <Chat /> : <h1>select a chat to start</h1>}
      </div>
    </div>
  );
}

export default Main;
