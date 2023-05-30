import React, { FormEvent } from 'react';

import styles from './Auth.module.css';

interface AuthProps {
  setIdInstance: (id: string) => void;
  setApiTokenInstance: (token: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ setIdInstance, setApiTokenInstance }) => {
  const handleAuthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idInstance = (e.currentTarget.elements.namedItem('idInstance') as HTMLInputElement)?.value;
    const apiTokenInstance = (e.currentTarget.elements.namedItem('apiTokenInstance') as HTMLInputElement)?.value;
    setIdInstance(idInstance || '');
    setApiTokenInstance(apiTokenInstance || '');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAuthSubmit}>
        <label className={styles.label}>ID Instance:</label>
        <input autoComplete="on" className={styles.input} type="text" name="idInstance" required />
        <label className={styles.label}> API Token Instance:</label>
        <input autoComplete="on" className={styles.input} type="text" name="apiTokenInstance" required />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
