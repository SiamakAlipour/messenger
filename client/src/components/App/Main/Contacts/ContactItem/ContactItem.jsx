import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';

import axios from 'service/api/baseUrl';

import './ContactItem.scss';

function ContactItem({ contactName }) {
  const navigate = useNavigate();
  const [lastMessage, setLastMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .post('/message/sync', {
        user1: user.username,
        user2: contactName,
      })
      .then((res) => {
        const { length } = res.data;
        const lastPM = res.data[length - 1];
        return setLastMessage(lastPM.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/account/${contactName}`)
      .then((res) => {
        const { avatar } = res.data;
        return setAvatar(avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClick = () => {
    const rightPart = document.getElementById('right');
    const leftPart = document.getElementById('left');
    // let backButton = document.getElementById('backButton');
    // let chatHeader = document.getElementById('chatHeader');
    // mainPart.style.flexDirection = 'column';
    rightPart.classList.add('right__click');
    leftPart.classList.add('left__click');
    // backButton.classList.add('buttonShow');
    // chatHeader.classList.add('show');
  };
  return (
    <div
      className="contactItem"
      onClick={() => {
        navigate(`/messenger/${contactName}`);
      }}
      aria-hidden="true"
    >
      <div className="contactItem__avatar">
        {' '}
        {avatar ? <img src={avatar} alt="" /> : <PersonIcon />}
      </div>
      <div className="contactItem__msg" onClick={handleClick} aria-hidden="true">
        <h5>{contactName} </h5>
        <p> {lastMessage}</p>
      </div>
    </div>
  );
}

ContactItem.propTypes = {
  contactName: PropTypes.string.isRequired,
};
export default ContactItem;
