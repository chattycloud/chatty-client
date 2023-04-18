import React from 'react';
import io, { Socket } from 'socket.io-client';
import axios, { AxiosInstance } from 'axios';
import md5 from 'md5';
import { format } from 'date-fns';

interface iTranslationIndexSignature {
  [key: string]: string;
}

enum eAppPricing {
  FREE = "FREE",
  PRODUCTION = "PRODUCTION",
  ADVANCED = "ADVANCED",
  ENTERPRISE = "ENTERPRISE",
}

enum eMemberPermission {
  SUPER = "SUPER",
  WRITE = "WRITE",
  READ = "READ",
}

enum eMessageType {
  TEXT = "TEXT",
  FILE = "FILE",
  JSON = "JSON",
}

enum eMessageBy {
  USER = "USER",
  ADMIN = "ADMIN",
  SYSTEM = "SYSTEM",
}

enum eNotification {
  CHATTY_USER_MESSAGE = "CHATTY_USER_MESSAGE",
  CHATTY_ADMIN_MESSAGE = "CHATTY_ADMIN_MESSAGE",
  CHATTY_SYSTEM_MESSAGE = "CHATTY_SYSTEM_MESSAGE",
}

interface iDevice {
  platform: string;
  language: string;
  product: string;
  userAgent: string;
  sdkVersion?: string;
}

interface iInitPayload {
  apiKey: string;
  member: {
    id: string;
    name: string;
    avatar?: string;
    deviceToken?: string;
    language?: string;
    country?: string;
    group?: string;
    data?: any;
  };
}

interface iMissedCount {
  total: number; // total missedCount
  byGroup: Array<{ name: string, count: number }>,  // missedCount by group name
  byChat: Array<{ id: string, count: number }>      // missedCount of all individual chat
}

interface iMembersFilter {
  group?: string;
  keyword?: string; // keyword for searching member name
  ChatId?: string;
}

interface iChatsFilter {
  group?: string;
  keyword?: string; // keyword for searching chat name
  MemberId?: string; // if MemberId is specified, get chats only MemberId included. if not, get all chats created
  page?: number;
  pageLimit?: number;
}


interface iExitPayload {
  deleteMember?: boolean; // Deleting member. It's useful when application user delete account. Default value is false.
}

interface iApp {
  id: string;
  name: string;
  pricing: eAppPricing;
  image: { uri: string };
  language: string;
  country: string;
  enableTranslation: boolean;
  enableJoinMessage: boolean;
  enableLeaveMessage: boolean;
  enableInviteMessage: boolean;
  enableExcludeMessage: boolean;
  enableImageUpload: boolean;
  enableVideoUpload: boolean;
  chatCapacity: number;
  chatPageLimit: number;
  chatListPageLimit: number;
  thumbnailSize: number;
  notificationSound: string;
  maxImageSize: number;
  maxVideoSize: number;
  multipleUploadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface iMember {
  id: string;
  name: string;
  language: string;
  country: string;
  avatar: string;
  device: iDevice;
  deviceToken: string;
  group: string;
  permission: eMemberPermission;
  data: any | null;
  createdAt: Date;
  updatedAt: Date;
}

interface iMessage {
  id: string;
  text: string | null;
  files: Array<{ uri: string }>;
  json: any | null;
  type: eMessageType;
  translation: iTranslationIndexSignature | null;
  by: eMessageBy;
  readReceipt: number;
  createdAt: Date;
  updatedAt: Date;
  sender: iMember | null;
}

interface iChat {
  id: string;
  name: string;
  image: { uri: string };
  lastMessage: iMessage | null;
  data: any | null;
  distinctKey: string | null;
  group: string;
  createdAt: Date;
  updatedAt: Date;
  members: Array<iMember>;
  missedCount: number;
}

interface iCreateAdminMessagePayload {
  distinctKey: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  members?: Array<string>;
  message?: {
    text?: string;
    json?: object;
    by?: eMessageBy.ADMIN;
  };
}

interface iCreateChatPayload {
  distinctKey?: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  members?: Array<string>;
  message?: {
    text?: string;
    json?: object;
    by?: eMessageBy.ADMIN;
  };
}

interface iUpdateChatPayload {
  id: string;
  distinctKey?: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  members?: Array<string>;
  message?: {
    text?: string;
    json?: object;
    by?: eMessageBy.ADMIN;
  };
}

export enum eChattyEvent {
  CONNECT = "connection",
  CONNECT_DONE = "connect_done",
  CONNECT_FAIL = "connect_fail",

  DISCONNECT = "disconnect",
  DISCONNECT_DONE = "disconnect_done",
  DISCONNECT_FAIL = "disconnect_fail",

  REFRESH_CHAT = "refresh_chat",
  REFRESH_CHAT_DONE = "refresh_chat_done",
  REFRESH_CHAT_FAIL = "refresh_chat_fail",

  RECEIVE_MESSAGE = "receive_message",

  FETCH_MESSAGES = "fetch_messages",
  FETCH_MESSAGES_DONE = "fetch_messages_done",
  FETCH_MESSAGES_FAIL = "fetch_messages_fail",

  UPDATE_MESSAGES = "update_message",

  SEND_MESSAGE = "send_message",
  SEND_MESSAGE_DONE = "send_message_done",
  SEND_MESSAGE_FAIL = "send_message_fail",
  SEND_MESSAGE_RETRY = "send_message_retry",

  DELETE_MESSAGE = "delete_message",
  DELETE_MESSAGE_DONE = "delete_message_done",
  DELETE_MESSAGE_FAIL = "delete_message_fail",

  MARK_AS_READ = "mark_as_read",
  MARK_AS_READ_DONE = "mark_as_read_done",
  MARK_AS_READ_FAIL = "mark_as_read_fail",

  // TOBE DEPRECATED
  FETCH_CHATS = "fetch_chats",
  FETCH_CHATS_DONE = "fetch_chats_done",
  FETCH_CHATS_FAIL = "fetch_chats_fail",

  // TOBE DEPRECATED
  // 아래 내용들은 SYSTEM MESSAGE와 관련된 내용으로, 대시보드에서 사용 설정하게 되면 PUSH 메시지로 전달됩니다.
  // 따라서, 이벤트를 받아서 처리하는 것은 권장하지 않습니다.
  // 또한 대시보드에서 사용설정을 해제하면, 아래 이벤트들을 챗화면에서 업데이트 하지 않습니다.
  // 따라서 사용하지 않을 예정
  INVITE_MEMBERS = "invite_members",
  INVITE_MEMBERS_DONE = "invite_members_done",
  INVITE_MEMBERS_FAIL = "invite_members_fail",

  EXCLUDE_MEMBERS = "exclude_members",
  EXCLUDE_MEMBERS_DONE = "exclude_members_done",
  EXCLUDE_MEMBERS_FAIL = "exclude_members_fail",

  JOIN_CHAT = "join_chat",
  JOIN_CHAT_DONE = "join_chat_done",
  JOIN_CHAT_FAIL = "join_chat_fail",

  LEAVE_CHAT = "leave_chat",
  LEAVE_CHAT_DONE = "leave_chat_done",
  LEAVE_CHAT_FAIL = "leave_chat_fail",
}



class Chatty {
  static apiKey: string | undefined;
  static app: iApp | undefined;
  static member: iMember | undefined;
  static axiosInstance: AxiosInstance;

  static async init({ apiKey, member }: iInitPayload) {
    try {
      if (!apiKey) return Promise.reject({ message: ":: ChattyClient init() apiKey is required." });
      this.axiosInstance = getAxiosInstance(apiKey);
      this.apiKey = apiKey;
      this.app = await this.getApp();
      this.axiosInstance.defaults.headers.common['AppId'] = this.app.id;
      this.member = await this.upsertMember({
        ...member,
        device: {
          platform: navigator.platform,
          language: navigator.language,
          product: navigator.product,
          userAgent: navigator.userAgent,
          sdkVersion: process.env.VERSION,
        }
      });
      this.axiosInstance.defaults.headers.common['MemberId'] = this.member.id;
      if (this.app && this.member) {
        ChattyEventEmitter.emit('initialized', { initialized: true });
        console.debug(":: ChattyClient Initialized !!");
        console.debug(":: ChattyClient App > ", this.app);
        console.debug(":: ChattyClient Member > ", this.member);
      }
    } catch (error: any) {
      return Promise.reject({ message: ":: ChattyClient init fail - " + error.message });
    }
  }

  static async exit({ deleteMember = false }: iExitPayload) {
    try {
      if (this.member) {
        if (deleteMember) {
          await this.deleteMember(this.member.id);
        } else {
          await this.upsertMember({ ...this.member, deviceToken: '' });
        }
      }

      this.apiKey = undefined;
      this.app = undefined;
      this.member = undefined;
      this.axiosInstance.defaults.headers.common = {};
      console.debug(":: ChattyClient exit success");
    } catch (error: any) {
      return Promise.reject({ message: ":: ChattyClient exit fail - " + error.message });
    }
  }

  private static async getApp(): Promise<iApp> {
    const { data } = await this.axiosInstance.get(`/apps`, { headers: {} });
    return data;
  }

  static async getChats(filter: iChatsFilter): Promise<iChat[]> {
    const { data } = await this.axiosInstance.get('/chats', { params: filter });
    return data;
  }

  static async createChat(payload: iCreateChatPayload): Promise<iChat> {
    const { data } = await this.axiosInstance.post("/chats", {
      ...payload,
      image: payload.image ? { uri: payload.image } : undefined,
      Members: payload.members?.map((MemberId: string) => ({ MemberId: MemberId, AppId: this.app?.id, })),
      Messages: payload.message && [
        {
          ...payload.message,
          AppId: this.app?.id,
          type: payload.message.json ? eMessageType.JSON : eMessageType.TEXT
        },
      ]
    });

    return data;
  }

  static async leaveChat(ChatId: string): Promise<Boolean> {
    const { data } = await this.axiosInstance.delete<Boolean>(`/chatmember`, { params: { ChatId: ChatId } });
    return data;
  }

  static async updateChat(payload: iUpdateChatPayload): Promise<iChat> {
    const { data } = await this.axiosInstance.put(`/chats`, {
      ...payload,
      image: payload.image ? { uri: payload.image } : undefined,
      Members: payload.members?.map((MemberId: string) => ({
        MemberId: MemberId,
        AppId: this.app?.id,
      })),
      Messages: payload.message && [
        {
          ...payload.message,
          AppId: this.app?.id,
          type: payload.message.json ? eMessageType.JSON : eMessageType.TEXT
        },
      ]
    });
    return data;
  }


  static async createAdminMessage(payload: iCreateAdminMessagePayload): Promise<iChat> {
    const { data } = await this.axiosInstance
      .post(`/messages`, {
        ...payload,
        image: payload.image ? { uri: payload.image } : undefined,
        Members: payload.members?.map((MemberId: string) => ({
          MemberId: MemberId,
          AppId: this.app?.id,
        })),
        Messages: payload.message && [
          {
            ...payload.message,
            AppId: this.app?.id,
            type: payload.message.json ? eMessageType.JSON : eMessageType.TEXT,
            by: eMessageBy.ADMIN,
          },
        ]
      });

    return data;
  }

  static async getMembers(filter: iMembersFilter): Promise<Array<iMember>> {
    const { data } = await this.axiosInstance.get(`/members`, { params: filter });
    return data;
  }

  private static async upsertMember(member: {
    id: string;
    name: string;
    avatar?: string;
    group?: string;
    data?: any;
    deviceToken?: string;
    device: iDevice;
  }): Promise<iMember> {
    const { data } = await this.axiosInstance.put('/members', member);
    return data;
  }

  private static async deleteMember(id: string): Promise<Boolean> {
    return await this.axiosInstance.delete(`/members/${id}`);
  }

  static generateDistinctKey(...payload: Array<string>): string | undefined {
    if (!payload || !payload.length) {
      console.warn(':: ChattyClient generateDistinctKey error - param data is undefined');
      return;
    }

    if (!this.app) {
      console.warn(':: ChattyClient generateDistinctKey error - Chatty was not initialized');
      return;
    }

    // add AppId to hash elements
    payload.push(this.app.id);

    const inputValue = payload.sort().toString();

    if (inputValue.length >= 255) {
      console.warn(
        ":: ChattyClient generateDistinctKey error - md5 input string is too long"
      );
      return;
    }

    return md5(inputValue);
  }

  static getMissedCount = async (): Promise<iMissedCount> => {
    if (!this.app || !this.member) return Promise.reject({ message: ":: ChattyClient getMissedCount fail - Chatty was not initialized" });
    const { data } = await this.axiosInstance.get(`/missed-count`);
    ChattyEventEmitter.emit('missed-count', data);
    return data;
  }

  static upload = async (files: Array<{ uri: string, type: string }>): Promise<Array<{ uri: string }>> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.app || !this.member) return reject({ message: ":: ChattyClient upload fail - Chatty was not initialized" });

        // if (!validateFiles(files, Chatty.app)) {
        //   reject(":: ChattyClient uploadFiles - File validations are failed");
        // }

        const result = await Promise.all(
          files.map(async (file: any) => {
            const form = new FormData();
            form.append("file", file);

            const uploadUrl = await this.axiosInstance?.get("/uploadurl");
            if (!uploadUrl?.data) {
              reject({ message: ":: ChattyClient upload - Getting uploadUrl failed" });
            }

            const uploaded = await axios.post(uploadUrl?.data, form, {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            });

            if (uploaded?.data?.result) {
              const baseurl = uploaded.data.result.variants[0].split(
                uploaded.data.result.id
              )[0];
              return {
                uri:
                  baseurl +
                  uploaded.data.result.id +
                  "/" +
                  this.app?.thumbnailSize,
              };
            } else {
              return { uri: "" };
            }
          })
        );

        resolve(result);
      } catch (error: any) {
        reject(error);
      }
    });
  }
}

class ChattyEventEmitter {
  static listeners: { [event: string]: Array<(data?: any) => void> } = {};

  static on(event: string, callback: (data?: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  static off(event: string, callback: (data?: any) => void): void {
    if (!this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  static emit(event: string, data?: any): void {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach((callback) => callback(data));
  }
}

const getAxiosInstance = (ApiKey: string): AxiosInstance => {
  const instance = axios.create();
  instance.defaults.baseURL = process.env.API_URL;
  instance.defaults.headers.common['ApiKey'] = ApiKey;
  instance.defaults.headers.common["Content-Type"] = "application/json";
  instance.interceptors.request.use((request) => request, (error) => Promise.reject({ ...error, message: ':: ChattyClient Request Error' }));
  instance.interceptors.response.use((response) => response, (error) => Promise.reject({ ...error, message: ':: ChattyClient Response Error' }));
  return instance;
}


const useIsInitialized = (): boolean => {
  const [initialized, setInitialized] = React.useState<boolean>(Chatty.apiKey && Chatty.app && Chatty.member ? true : false);
  React.useEffect(() => {
    if (initialized) return;
    const handleInitialized = (data: any) => {
      setInitialized(data.initialized);
    };
    ChattyEventEmitter.on('initialized', handleInitialized);
    return () => {
      console.debug(':: ChattyClient useInitialized - remove listener initialized')
      ChattyEventEmitter.off('initialized', handleInitialized);
    };
  }, []);
  return initialized;
}

const useMissedCount = (): iMissedCount | undefined => {
  const initialized = useIsInitialized();
  const [missedCount, setMissedCount] = React.useState<iMissedCount>();

  React.useEffect(() => {
    if (!initialized || !!missedCount) return;
    console.debug(':: ChattyClient useMissedCount - useEffect');
    const updateMissedCount = (data: iMissedCount) => {
      console.debug(':: ChattyClient MissedCount updated !!');
      setMissedCount(data);
    };
    ChattyEventEmitter.on('missed-count', updateMissedCount);

    Chatty.getMissedCount();

    return () => {
      ChattyEventEmitter.off('missed-count', updateMissedCount);
    };
  }, [initialized]);

  return missedCount;
}

const useSocket = ({ id, chat }: {
  id?: string,
  chat?: {
    Members: string[];
    distinctKey: string;
    name?: string;
    avatar?: string;
    group?: string;
    data?: any;
  }
}): Socket | null => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    if (socket) return;

    console.debug(':: ChattyClient - socket connecting', process.env.SOCKET_URL);
    const newSocket = io(`${process.env.SOCKET_URL}/chat.${Chatty.app?.name}`, {
      query: { id: id, Chat: chat },
      auth: { apiKey: Chatty.apiKey, MemberId: Chatty.member?.id, AppId: Chatty.app?.id },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      setSocket(null);
      console.debug(':: ChattyClient - socket disconnected');
    };
  }, []);

  return socket;
};

const useChat = ({ id, key, payload }: {
  id?: string,  // The chat ID, obtained as a part of the server's response at chatlist screen.
  key?: string, // The md5 distinctKey, which is generated by combining chat member's IDs or a user-defined custom key, serves as a unique identifier for each chat.
  payload?: {  // The payload object, which is used to create a new chat or update a existing chat.
    members?: string[];
    name?: string;
    image?: string;
    group?: string;
    data?: any;
  }
}): {
  chat: iChat,
  messages: { [date: string]: { [timeSenderIdKey: string]: iMessage[] } },
  isLoading: boolean,
  fetchMessages: (refresh?: boolean) => void,
  sendMessage: (message: string | object | Array<{ uri: string, type: string }>) => void,
  refresh: () => void,
  // error: {message: string},
} => {
  const [chat, setChat] = React.useState<iChat>(null);
  const [messages, setMessages] = React.useState<iMessage[]>([]);
  const [hasNext, setHasNext] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const socket = useSocket({ id, chat: { ...payload, Members: payload.members, distinctKey: key } });

  const typedMessages = React.useMemo(() => {
    let groupedMessages: { [date: string]: { [timeSenderIdKey: string]: iMessage[] } };

    messages.map((message) => {
      const dateKey = format(new Date(message.createdAt), 'PP');
      const timeKey = format(new Date(message.createdAt), 'p');
      const SenderIdKey = message.sender?.id!;
      const timeSenderIdKey = `${timeKey}@${SenderIdKey}`;

      if (!groupedMessages) {
        groupedMessages = {};
      }

      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = {};
      }
      if (!groupedMessages[dateKey][timeSenderIdKey]) {
        groupedMessages[dateKey][timeSenderIdKey] = [];
      }

      groupedMessages[dateKey][timeSenderIdKey].push(message);
    });

    return groupedMessages;
  }, [messages]);

  React.useEffect(() => {
    if (!socket) return;

    // CONNECT
    socket.on(eChattyEvent.CONNECT_DONE, (data: any) => {
      setChat(data.chat);
      setMessages(data.messages!);
      setHasNext(data.hasNext!);
      socket.emit(eChattyEvent.MARK_AS_READ);
      setIsLoading(false);
    });
    socket.on(eChattyEvent.CONNECT_FAIL, (error: any) => {
      setIsLoading(false);
      console.warn(':: ChattyClient connection fail', error);
    });

    // FETCH_MESSAGES
    socket.on(eChattyEvent.FETCH_MESSAGES_DONE, (data: any) => {
      if (data.refresh) {
        setMessages(data.messages!);
        setHasNext(data.hasNext!);
      } else {
        setMessages([...messages, ...data.messages!]);
        setHasNext(data.hasNext!);
      }
      socket.emit(eChattyEvent.MARK_AS_READ);
    });
    socket.on(eChattyEvent.FETCH_MESSAGES_FAIL, (error: any) => {
      console.warn(':: ChattyClient fetch messages fail', error);
    });

    // SEND_MESSAGE
    socket.on(eChattyEvent.SEND_MESSAGE_DONE, (data: any) => {
      console.debug(':: ChattyClient send message done', data);
      setMessages((oldMessages) => {
        const oldMessagesMap = new Map(oldMessages.map((e) => [e['id'], e]));
        const newMessagesMap = new Map(data.message && [[data.message['id'], data.message]]);
        const messagesMap = new Map([...Array.from(oldMessagesMap), ...Array.from(newMessagesMap)]);
        return Array.from(messagesMap.values());
      });
    });
    socket.on(eChattyEvent.SEND_MESSAGE_RETRY, (data: { retry: number }) => {
      console.debug(':: ChattyClient send message retry', data);
      socket.emit(eChattyEvent.SEND_MESSAGE, data);
    });
    socket.on(eChattyEvent.SEND_MESSAGE_FAIL, (error: any) => {
      console.warn(':: ChattyClient send message fail', error);
    });

    // RECEIVE_MESSAGE
    socket.on(eChattyEvent.RECEIVE_MESSAGE, (data: any) => {
      console.debug(':: ChattyClient receive message', data);
      setMessages((oldMessages) => {
        const oldMessagesMap = new Map(oldMessages.map((e) => [e['id'], e]));
        const newMessagesMap = new Map(data.message && [[data.message['id'], data.message]]);
        const messagesMap = new Map([...Array.from(newMessagesMap), ...Array.from(oldMessagesMap)]);
        return Array.from(messagesMap.values());
      });
      socket.emit(eChattyEvent.MARK_AS_READ);
    });

    // MARK_AS_READ
    socket.on(eChattyEvent.MARK_AS_READ_DONE, () => {
      console.debug(':: ChattyClient mark as read done');
      ChattyEventEmitter.emit(eChattyEvent.MARK_AS_READ_DONE);
    });
    socket.on(eChattyEvent.MARK_AS_READ_FAIL, (error: any) => {
      console.debug(':: ChattyClient mark as read fail', error);
    });

    // UPDATE_MESSAGES
    socket.on(eChattyEvent.UPDATE_MESSAGES, (data: { messages: Array<iMessage> }) => {
      console.debug(':: ChattyClient update messages', data);
      // readReceipt가 변경되었거나 메세지내용이 삭제또는 변경된경우 update하기 위해 발생되는 이벤트 (서버주도로 발생)
      setMessages((oldMessages) => {
        const oldMessagesMap = new Map(oldMessages.map((e) => [e['id'], e]));
        const newMessagesMap = new Map(data.messages?.map((e) => [e['id'], e]));
        const messagesMap = new Map([...Array.from(oldMessagesMap), ...Array.from(newMessagesMap)]);
        return Array.from(messagesMap.values());
      });
    });

    // REFRESH_CHAT
    socket.on(eChattyEvent.REFRESH_CHAT_DONE, (data: { chat: iChat }) => {
      console.debug(':: ChattyClient refresh chat done', data);
      setChat(data.chat);
    });


    return () => {
      console.debug(':: ChattyClient disconnect');
      socket.off(eChattyEvent.CONNECT_DONE);
      socket.off(eChattyEvent.CONNECT_FAIL);
      socket.off(eChattyEvent.FETCH_MESSAGES_DONE);
      socket.off(eChattyEvent.FETCH_MESSAGES_FAIL);
      socket.off(eChattyEvent.SEND_MESSAGE_DONE);
      socket.off(eChattyEvent.SEND_MESSAGE_RETRY);
      socket.off(eChattyEvent.SEND_MESSAGE_FAIL);
      socket.off(eChattyEvent.RECEIVE_MESSAGE);
      socket.off(eChattyEvent.MARK_AS_READ_DONE);
      socket.off(eChattyEvent.MARK_AS_READ_FAIL);
      socket.off(eChattyEvent.UPDATE_MESSAGES);
      socket.off(eChattyEvent.REFRESH_CHAT_DONE);
    };
  }, [socket]);

  const fetchMessages = (refresh: boolean) => {
    if (hasNext) {
      socket.emit(eChattyEvent.FETCH_MESSAGES, { refresh });
    }
  }

  const refreshChat = () => {
    socket.emit(eChattyEvent.REFRESH_CHAT);
  }

  const isMessageString = (message: string | object | Array<{ uri: string, type: string }>): message is string => {
    return typeof message === 'string';
  }
  const isMessageArray = (message: string | object | Array<{ uri: string, type: string }>): message is Array<{ uri: string, type: string }> => {
    return Array.isArray(message);
  }
  const isMessageObject = (message: string | object | Array<{ uri: string, type: string }>): message is object => {
    return typeof message === 'object' && message !== null && !Array.isArray(message);
  }

  const sendMessage = async (message: string | object | Array<{ uri: string, type: string }>) => {
    const id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    const now = new Date();
    const type = isMessageString(message) ? eMessageType.TEXT : (isMessageObject(message) ? eMessageType.JSON : eMessageType.FILE);
    const text = isMessageString(message) ? message : (isMessageArray(message) ? 'File message' : 'JSON message');

    const tempMessage: iMessage = {
      id: id,
      text: text,
      files: isMessageArray(message) ? message : undefined,
      json: isMessageObject(message) ? message : undefined,
      type: type,
      by: eMessageBy.USER,
      translation: null,
      readReceipt: 0,
      createdAt: now,
      updatedAt: now,
      sender: Chatty.member,
    };

    setMessages((oldMessages) => {
      const oldMessagesMap = new Map(oldMessages.map((e) => [e['id'], e]));
      const newMessagesMap = new Map([[tempMessage['id'], tempMessage]]);
      const messagesMap = new Map([...Array.from(newMessagesMap), ...Array.from(oldMessagesMap),]);
      return Array.from(messagesMap.values());
    });

    socket.emit(eChattyEvent.SEND_MESSAGE, {
      id: id,
      text: text,
      files: isMessageArray(message) ? await Chatty.upload(message) : undefined,
      json: isMessageObject(message) ? message : undefined,
      type: type,
      by: eMessageBy.USER,
      createdAt: now,
      retry: 5
    });

  }



  return {
    chat,
    messages: typedMessages,
    isLoading,
    fetchMessages,
    sendMessage,
    refresh: refreshChat,
    // error
  };
};


export {
  Chatty,
  useIsInitialized,
  useMissedCount,
  useChat,
  eMessageBy,
  eMessageType,
  eNotification,
  iMissedCount,
  iChat,
  iMessage,
  iMember
};