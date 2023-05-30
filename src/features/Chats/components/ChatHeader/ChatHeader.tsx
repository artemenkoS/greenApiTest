import React from 'react';

import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Search } from './assets/search.svg';

import styles from './ChatHeader.module.css';

interface IProps {
  chatTitle?: string;
}

export const ChatHeader: React.FC<IProps> = ({ chatTitle = 'WhatsApp Chat' }) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatar}></div>
      <div className={styles.chatTitle}>{chatTitle}</div>
      <Menu className={styles.icon} />
      <Search className={styles.icon} />
    </div>
  );
};
