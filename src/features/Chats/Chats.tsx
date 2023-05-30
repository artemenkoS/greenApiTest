import axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

import { Button } from '../../components/Button/Button';
import { Chat } from './components/Chat/Chat';
import { ChatHeader } from './components/ChatHeader/ChatHeader';
import { MessageForm } from './components/MessageForm/MessageForm';
import styles from './Chats.module.css';
import { REQUEST_TIMEOUT_MS } from './constants';
import { ChatMap, ChatMessage } from './types';

interface IProps {
  idInstance: string;
  apiTokenInstance: string;
}

const typeMessages: Record<string, string> = {
  quotedMessage: 'extendedTextMessageData',
  extendedTextMessage: 'extendedTextMessageData',
  textMessage: 'textMessageData',
};

export const Chats: React.FC<IProps> = ({ idInstance, apiTokenInstance }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<ChatMap>({});

  const sendMessage = async () => {
    try {
      if (selectedChat) {
        await axios.post(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
          chatId: `${selectedChat}@c.us`,
          message: message,
        });

        const sentMessage: ChatMessage = {
          text: message,
          date: new Date().toISOString(),
          sent: true,
        };

        setChats((prevChats) => ({
          ...prevChats,
          [selectedChat]: (chats[selectedChat] || []).concat(sentMessage),
        }));

        setMessage('');
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  const receiveMessage = () => {
    axios
      .get(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
      .then((response) => {
        if (!response.data) {
          throw null;
        }

        const body = response.data.body;
        if (body && body.typeWebhook === 'incomingMessageReceived' && typeMessages[body.messageData.typeMessage]) {
          const messageDataText = body.messageData[typeMessages[body.messageData.typeMessage]];
          const text = messageDataText?.text ?? messageDataText?.textMessage;

          if (text) {
            const receivedMessage: ChatMessage = {
              text,
              date: new Date(body.timestamp * 1000).toISOString(),
              sent: false,
              isForwarded: messageDataText.isForwarded,
              quotedMessage: body.messageData.quotedMessage?.textMessage,
            };

            const phoneNumber = body.senderData.chatId.split('@')[0];

            setChats((prevChats) => ({
              ...prevChats,
              [phoneNumber]: (prevChats[phoneNumber] || []).concat(receivedMessage),
            }));
          }
        }

        return response.data.receiptId;
      })
      .then(async (receiptId) => {
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
        );
      })
      .then(() => {
        receiveMessage();
      })
      .catch(() => {
        setTimeout(() => {
          receiveMessage();
        }, REQUEST_TIMEOUT_MS);
      });
  };

  useEffect(() => {
    receiveMessage();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleCreateChat = () => {
    const formattedNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (!!formattedNumber && !chats[formattedNumber]) {
      setChats((prevChats) => ({
        ...prevChats,
        [formattedNumber]: [],
      }));
    }
    setPhoneNumber('');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.contacts}>
        <input
          autoComplete="on"
          className={styles.phoneNumberInput}
          placeholder="Enter phone number "
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          fullWidth
          className={styles.createChatButton}
          disabled={!phoneNumber}
          text="Create Chat"
          onClick={handleCreateChat}
        />

        <div className={styles.chatList}>
          {Object.keys(chats).map((number) => (
            <div
              key={number}
              className={clsx(styles.chatItem, { [styles.active]: number === selectedChat })}
              onClick={() => setSelectedChat(number)}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chat}>
        <ChatHeader chatTitle={selectedChat} />
        <Chat chat={chats[selectedChat]} />
        <MessageForm
          message={message}
          setMessage={setMessage}
          selectedChat={selectedChat}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
