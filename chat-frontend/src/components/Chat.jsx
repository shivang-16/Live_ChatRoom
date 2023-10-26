import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { user } from './Register';
import Message from './Message';
import '../Styles/chat.scss';
import ReactScrollToBottom from "react-scroll-to-bottom";

const socket = io('http://localhost:4500');

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [id, setId] = useState('');

  const sendChat = (e) => {
    const message = document.getElementById('chatInput').value;
    e.preventDefault();
    const payload = {
      user,
      message,
      id
    };
    socket.emit('chat', payload);
    document.getElementById('chatInput').value = "";
  };

  useEffect(() => {
    socket.emit('joined', { user }, (socketId) => {
      setId(socketId); 
    });

    socket.on('chat', (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
      setId(socket.id);
    });

    socket.on('userJoined', (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
    });

    socket.on('leave', (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, []); 

  return (
    <>
      <div className='chat-box'>
        <div className="chat-header">
          <h2>Welcome to the chat <span className='name'>{user}</span></h2>
        </div>
        <ReactScrollToBottom className="chat-content">
          {chat.map((payload, index) => {
            return (
              <Message
                key={index}
                user={payload?.id === id ? "" : payload.user}
                message={payload.message}
                messageClass={payload.id === id ? 'right' : 'left'}
              />
            )
          })}

        </ReactScrollToBottom>
        <div className="send-box">
          <form onSubmit={sendChat}>
            <input
              type="text"
              placeholder="Write something"
              id='chatInput'
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
