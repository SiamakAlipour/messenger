import React from 'react';
import { useParams } from 'react-router';

import PropTypes from 'prop-types';

import './Message.scss';

function Message({ receiver, timestamp, msg }) {
  const params = useParams();
  // 'siamak' haman username login shode khahad bod
  const user = JSON.parse(localStorage.getItem('user'));
  return receiver !== user.username ? (
    <div className="msg">
      <div className="bubble alt">
        <div className="txt">
          <div className="txt__wrap">
            <span className="name alt">{user.username}</span>
            <span className="timestamp">{timestamp}</span>
          </div>

          <p className="message">{msg}</p>
        </div>
        <div className="bubble-arrow alt" />
      </div>
    </div>
  ) : (
    <div className="msg">
      <div className="bubble">
        <div className="txt">
          <div className="txt__wrap">
            <span className="name">{params.user}</span>
            <span className="timestamp">{timestamp}</span>
          </div>
          <span className="message">{msg}</span>
        </div>
        <div className="bubble-arrow" />
      </div>
    </div>
  );
}

Message.propTypes = {
  receiver: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Message;
