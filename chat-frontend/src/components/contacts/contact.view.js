import React from 'react';
import styles from './contact.module.css';
import Avatar from '../avatar';
import fetchResource from '../../utils/api';
import { useChatContext } from '../../context/chatContext';

const Contact = (props) => {
  const { contact, newChat } = props;
  const { setChat } = useChatContext();
  const handleOpenChat = () => {
    fetchResource('POST', 'chat', {
      body: {
        chatMembers: [contact._id],
      },
    }).then((res) => {
      setChat(res);
      newChat();
    });
  };
  return (
    <div className={styles.root} onClick={handleOpenChat}>
      <div className={styles.avatar}>
        <Avatar contact={contact} />
      </div>
      <div className={styles.text}>
        {contact.name}
      </div>
    </div>
  );
};

export default Contact;
