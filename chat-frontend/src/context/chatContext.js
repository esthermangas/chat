import React, {
  createContext, useState, useContext, useEffect,
} from 'react';
import { getStorageItem, setStorageItem } from '../utils/storageHelpers';
import { joinChat } from '../socket';

const ChatContext = createContext();

export const ChatContextProvider = (props) => {
  const { children } = props;
  const [chat, setChat] = useState(getStorageItem('active-chat'));
  const setChatStorage = (newChat) => {
    setStorageItem('active-chat', newChat);
    setChat(newChat);
  };
  useEffect(() => {
    if (chat) {
      joinChat(chat._id);
    }
  }, [chat]);

  return (
    <ChatContext.Provider value={{ chat, setChat: setChatStorage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
