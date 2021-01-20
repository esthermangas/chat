import { io } from 'socket.io-client';
import { getToken } from '../utils/sesion';

const tokenUserSession = getToken();
const API_URL = 'http://localhost:3001';

const socket = io(API_URL, {
  auth: {
    token: tokenUserSession,
  },
});

socket.on('connection', (message) => {
  console.log(message);
});

export const handleIncomingChat = (callback) => {
  socket.on('new-chat', callback);
};

export const handleNewUser = (callback) => {
  socket.on('new-user', callback);
};

export const joinChat = (chatId) => {
  socket.emit('join-chat', chatId);
};

export const handleMessage = (callback) => {
  socket.on('new-message', callback);
};

export default socket;
