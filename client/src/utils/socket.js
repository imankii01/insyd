import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (socket) {
    socket.disconnect();
  }
  
  socket = io('http://localhost:5000', {
    auth: {
      token
    }
  });
  
  return socket;
};

export const getSocket = () => socket;