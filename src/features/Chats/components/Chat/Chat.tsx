import React from 'react';

import { ChatMessage } from '../../types';
import { ReactComponent as Forwarded } from './assets/forwarded.svg';

import styles from './Chat.module.css';

interface IProps {
  chat?: ChatMessage[];
}

const formatMessageDate = (timestamp: string) => {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();

  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    return messageDate.toLocaleString('en-US', options);
  }
};

export const Chat: React.FC<IProps> = ({ chat }) => {
  return (
    <div className={styles.chatMessages}>
      {chat?.map((message, index) => (
        <div className={`${styles.chatMessage} ${message.sent ? styles.outgoing : styles.incoming}`} key={index}>
          {message.isForwarded && (
            <div className={styles.forwarded}>
              <Forwarded className={styles.icon} /> Forwarded message
            </div>
          )}
          {message.quotedMessage && <div className={styles.quoted}>{message.quotedMessage}</div>}
          <div className={styles.messageText}>{message.text}</div>
          <div className={styles.date}>{formatMessageDate(message.date)}</div>
        </div>
      ))}
    </div>
  );
};
