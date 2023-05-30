import React from 'react';

import { Button } from '../../../../components/Button/Button';
import { ReactComponent as Attachment } from './assets/attach.svg';
import { ReactComponent as Emoji } from './assets/emoji.svg';
import { ReactComponent as Mic } from './assets/mic.svg';

import styles from './MessageForm.module.css';

interface IProps {
  message: string;
  selectedChat: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const MessageForm: React.FC<IProps> = ({ message, setMessage, handleSubmit, selectedChat }) => {
  const isMessageEmpty = message.trim() === '';

  return (
    <form onSubmit={handleSubmit} className={styles.chatForm}>
      <Emoji className={styles.icon} />
      <Attachment className={styles.icon} />
      <textarea
        disabled={selectedChat === ''}
        cols={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.messageField}
        placeholder="Enter your message..."
      />

      <Button onClick={handleSubmit} className={styles.sendButton} disabled={isMessageEmpty} text="Send" />

      <Mic className={styles.icon} />
    </form>
  );
};
