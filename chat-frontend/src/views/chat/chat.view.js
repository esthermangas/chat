import React from 'react';
import styles from './chat.module.css';
import ContactsFile from '../contactsFile';
import MessagesLayout from '../messageLayout';

const Chat = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <ContactsFile />
      <MessagesLayout />
    </div>
  </div>
);

export default Chat;
