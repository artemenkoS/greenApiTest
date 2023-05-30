import React, { useState } from 'react';

import { Auth } from './features/Auth/Auth';
import { Chats } from './features/Chats/Chats';

export function App() {
  const [idInstance, setIdInstance] = useState<string>('');
  const [apiTokenInstance, setApiTokenInstance] = useState<string>('');

  if (!idInstance || !apiTokenInstance) {
    return <Auth setIdInstance={setIdInstance} setApiTokenInstance={setApiTokenInstance} />;
  }

  return <Chats idInstance={idInstance} apiTokenInstance={apiTokenInstance} />;
}
