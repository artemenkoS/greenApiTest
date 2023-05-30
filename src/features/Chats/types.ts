export type ChatMessage = {
  text: string;
  date: string;
  sent: boolean;
  isForwarded?: boolean;
  quotedMessage?: string;
};

export type ChatMap = {
  [phoneNumber: string]: ChatMessage[];
};

export interface IQuotedMessage {
  typeMessage: 'quotedMessage';
  extendedTextMessageData: {
    text: string;
    stanzaId: string;
    participant: string;
  };
  quotedMessage: {
    stanzaId: string; // id цитируемого сообщения
    participant: string; // id отправителя цитируемого сообщения
    typeMessage: string; // Тип цитируемого сообщения
    textMessage: string; // Текст цитируемого сообщения
  };
}

export interface IExtendedMessage {
  typeMessage: 'extendedTextMessage';
  extendedTextMessageData: {
    text: string;
    description: string;
    isForwarded: boolean;
    title: string;
    previewType: string;
    jpegThumbnail: string;
  };
}

export interface ITextMessage {
  typeMessage: 'extendedTextMessage';
  extendedTextMessageData: {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
  };
}

export interface IReceivedNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
    };
    messageData: ITextMessage | IExtendedMessage | IQuotedMessage;
  };
}
