import React, { useState, useEffect } from 'react';
import styles from './contactsFile.module.css';
import Selected from '../../components/selectedDiv';
import Contact from '../../components/contacts';
import OpenedContact from '../../components/openedContacts';
import fetchResource from '../../utils/api';
import { getUserSession } from '../../utils/sesion';
import { handleIncomingChat, handleNewUser } from '../../socket';

const ContactsFile = () => {
  const [select, setSelect] = useState('chats');
  const [contacts, setContacts] = useState([]);
  const [finalContacts, setFinalContacts] = useState([]);
  const userSession = getUserSession();
  const [chats, setChats] = useState([]);
  handleIncomingChat((newChat) => {
    setChats([...chats, newChat]);
  });
  handleNewUser((newUser) => {
    setContacts([...contacts, newUser]);
  });
  useEffect(() => {
    fetchResource('GET', 'user').then((res) => {
      setContacts(res.filter((user) => user._id !== userSession.user.id));
    });
  }, []);
  useEffect(() => {
    fetchResource('GET', 'chat').then((res) => {
      setChats(res);
    });
  }, []);
  const chatIncludesUser = (chat, user) => {
    const filteredUsers = chat.users.filter((el) => el._id === user._id);
    return filteredUsers.length > 0;
  };
  useEffect(() => {
    setFinalContacts(contacts.filter((contact) => {
      let contactExistInSomeChat = false;
      chats.forEach((chat) => {
        if (chatIncludesUser(chat, contact)) {
          contactExistInSomeChat = true;
        }
      });
      return !contactExistInSomeChat;
    }));
  }, [contacts, chats]);
  const displayChange = () => {
    setSelect('chats');
  };
  return (
    <div className={styles.root}>
      <div className={styles.contactsSearch}>
        <input placeholder="Search" className={styles.input} />
      </div>
      {select === 'contacts' && (
      <div className={styles.contactBody}>
        {finalContacts.map((c) => (<Contact contact={c} newChat={displayChange} />))}
      </div>
      )}
      {select === 'chats' && (
      <div className={styles.contactBody}>
        {chats.map((ch) => (<OpenedContact chat={ch} />))}
      </div>
      )}
      <div className={styles.contactsSettings}>
        <Selected label="CONTACTS" onClick={() => setSelect('contacts')} select={select === 'contacts'} />
        <Selected label="OPENED CHATS" onClick={() => setSelect('chats')} select={select === 'chats'} />
      </div>
    </div>
  );
};

export default ContactsFile;
