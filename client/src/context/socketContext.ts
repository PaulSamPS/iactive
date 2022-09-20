import React from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = React.createContext<Socket | null>(null);
export const socketContext = () => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const URL = 'https://176.113.83.209:5005';
  React.useEffect(() => {
    const newSocket = io(URL, { transports: ['websocket'] });
    newSocket.connect();
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  return { socket };
};
