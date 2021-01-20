import React from 'react';
import styles from './openedContacts.module.css';
import Avatar from '../avatar';
import { getUserSession } from '../../utils/sesion';
import { useChatContext } from '../../context/chatContext';

const OpenedContact = (props) => {
  const { chat } = props;
  const userSession = getUserSession();
  const { chat: activeChat, setChat } = useChatContext();
  const chatUser = chat.users.find((user) => user._id !== userSession.user.id);
  const handleClickId = () => {
    setChat(chat);
  };
  const rootStyle = {};
  if (chat._id === activeChat._id) {
    rootStyle.backgroundColor = '#afcaec';
  }
  return (
    <div className={styles.root} style={rootStyle} onClick={handleClickId}>
      <div className={styles.avatar}>
        <Avatar contact={chatUser} />
      </div>
      <div className={styles.text}>
        {chatUser.name}
      </div>
    </div>
  );
};

export default OpenedContact;
