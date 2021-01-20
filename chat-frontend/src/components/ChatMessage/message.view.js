import React from 'react';
import { format } from 'date-fns';
import styles from './message.module.css';
import Avatar from '../avatar';
import { getUserSession } from '../../utils/sesion';

const Message = (props) => {
  const { message } = props;
  const messageStyle = {};
  const userSession = getUserSession();
  if (userSession.user.id === message.user._id) {
    messageStyle.flexDirection = 'row-reverse';
    messageStyle.justifyContent = 'right';
  }
  const messageCreated = format(new Date(message.createdAt), 'kk:mm');
  return (
    <div className={styles.root} style={messageStyle}>
      <div>
        <Avatar contact={message.user} />
      </div>
      <div className={styles.text}>
        {message.body}
      </div>
      <div className={styles.time}>
        {messageCreated}
      </div>
    </div>
  );
};

export default Message;
