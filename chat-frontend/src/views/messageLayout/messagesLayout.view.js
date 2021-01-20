import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './messagesLayout.module.css';
import Button from '../../components/button';
import { getUserSession, removeUserSession } from '../../utils/sesion';
import AutoTextArea from '../../components/textArea';
import Message from '../../components/ChatMessage';
import { useChatContext } from '../../context/chatContext';
import fetchResource from '../../utils/api';
import Avatar from '../../components/avatar';
import { handleMessage } from '../../socket';

const MessagesLayout = () => {
  const userSession = getUserSession();
  const { chat } = useChatContext();
  const chatContact = chat ? chat.users.find((user) => user._id !== userSession.user.id) : undefined;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  const handleClickLogOut = () => {
    removeUserSession();
    history.push('/login');
  };
  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
  };
  useEffect(() => {
    if (chat) {
      fetchResource('GET', `message/${chat._id}`).then((res) => {
        setMessages(res);
      });
    }
  }, [chat]);
  const handleSendMessage = (evt) => {
    if (evt.keyCode === 13 && !evt.shiftKey) {
      evt.preventDefault();
      fetchResource('POST', `message/${chat._id}`, { body: { body: newMessage } }).then(() => {
        setNewMessage('');
      });
    }
  };
  handleMessage((m) => {
    setMessages([...messages, m]);
  });
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.chatInfo}>
          {chat && (<Avatar contact={chatContact} />)}
          <div className={styles.name}>
            {chat && chatContact.name}
          </div>
        </div>
        <div className={styles.userInfo}>
          <Avatar contact={userSession.user} />
          <div className={styles.name}>
            {userSession.user.name}
          </div>
          <div>
            <Button label="Log out" size="small" onClick={handleClickLogOut} variant="tertiary" />
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          {messages.map((mess) => (
            <Message message={mess} />
          ))}
        </div>
        <div className={styles.keyboard}>
          <AutoTextArea
            placeholder="Write a message..."
            onChange={handleChangeMessage}
            value={newMessage}
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesLayout;
