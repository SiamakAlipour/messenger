/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './Chat.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import TelegramIcon from '@mui/icons-material/Telegram';
import moment from 'moment';
import { useParams } from 'react-router';
import axios from 'service/api/baseUrl';
import Pusher from 'pusher-js';
import Message from './Message';

function Chat() {
  const params = useParams();
  const [chatInput, setChatInput] = useState('');
  const [msgList, setMsgList] = useState([]);
  const [avatar, setAvatar] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const handleInput = (e) => {
    setChatInput(e.target.value);
  };
  const handleSend = (e) => {
    e.preventDefault();
    axios
      .post('/message/send', {
        senderName: user.username,
        receiverName: params.user,
        message: chatInput,
        timestamp: moment().format('LLL'),
      })
      .catch((err) => console.log(err));
    setMsgList([
      ...msgList,
      {
        name: user.username,
        timestamp: moment().format('LLL'),
        message: chatInput,
        receiver: params.user,
      },
    ]);
    setChatInput('');
  };
  const handleClick = () => {
    const rightPart = document.getElementById('right');
    const leftPart = document.getElementById('left');
    const backButton = document.getElementById('backButton');
    const chatHeader = document.getElementById('chatHeader');
    // mainPart.style.flexDirection = 'column';
    rightPart.classList.remove('right__click');
    leftPart.classList.remove('left__click');
    backButton.classList.remove('buttonShow');
    chatHeader.classList.remove('show');
  };
  useEffect(() => {
    axios
      .post('/message/sync', { user1: user.username, user2: params.user })
      .then((res) => {
        setMsgList(res.data);
      })
      .catch((err) => console.log(err));
  }, [params]);
  useEffect(() => {
    axios
      .get(`/account/${params.user}`)
      .then((res) => {
        const { avatarData } = res.data;
        return setAvatar(avatarData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);
  useEffect(() => {
    const pusher = new Pusher('eba934b1dbc8ba404bcb', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('updated', () => {
      axios
        .post('/message/sync', { user1: user.username, user2: params.user })
        .then((res) => {
          setMsgList(res.data);
        })
        .catch((err) => console.log(err));
      console.log('hello');
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [msgList]);
  return (
    <div className="chat">
      <div className="chat__header" id="chatHeader">
        <div className="chat__headerLeftPart">
          {/* backToContacts */}
          <ArrowBackIosNewIcon id="backButton" onClick={handleClick} />

          {/* avatar */}
          <div className="chat__contactAvatar">
            {avatar ? <img src={avatar} alt="" /> : <PersonIcon />}
          </div>
        </div>
        <div className="chat__headerRightPart">
          <h2>{params.user}</h2>
        </div>
      </div>
      <div className="chat__content">
        {/* chat part */}
        <div className="chat__contentPart">
          {msgList.map((list) => (
            <Message
              receiver={list.receiver}
              timestamp={list.timestamp}
              msg={list.message}
              key={list._id}
            />
          ))}
        </div>
        {/* chat input */}

        <form className="chat__contentInput" onSubmit={handleSend}>
          <input type="text" className="chat__input" value={chatInput} onChange={handleInput} />
          <button type="submit">
            <TelegramIcon />{' '}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
