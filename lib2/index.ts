import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useQuery, useQueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';
import md5 from 'md5';

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
  SenderId: string | null;
  Sender: iMember | null;
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
  Members: Array<iMember>;
  _count?: {
    Receipts: number;
  };
}

interface iCreateAdminMessagePayload {
  distinctKey: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  Members?: Array<string>;
  Message?: {
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
  Members?: Array<string>;
  Message?: {
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
  Members?: Array<string>;
  Message?: {
    text?: string;
    json?: object;
    by?: eMessageBy.ADMIN;
  };
}



class Chatty {
  static apiKey: string | undefined;
  static app: iApp | undefined;
  static member: iMember | undefined;
  static axiosInstance: AxiosInstance;

  static async init({ apiKey, member }: iInitPayload): Promise<iMissedCount | undefined> {
    try {
      if (!apiKey) return Promise.reject({ message: ":: ChattyClient init() apiKey is required." });
      this.axiosInstance = getAxiosInstance(apiKey);
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
      Members: payload.Members?.map((MemberId: string) => ({ MemberId: MemberId, AppId: this.app?.id, })),
      Messages: payload.Message && [
        {
          ...payload.Message,
          AppId: this.app?.id,
          type: payload.Message.json ? eMessageType.JSON : eMessageType.TEXT
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
      Members: payload.Members?.map((MemberId: string) => ({
        MemberId: MemberId,
        AppId: this.app?.id,
      })),
      Messages: payload.Message && [
        {
          ...payload.Message,
          AppId: this.app?.id,
          type: payload.Message.json ? eMessageType.JSON : eMessageType.TEXT
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
        Members: payload.Members?.map((MemberId: string) => ({
          MemberId: MemberId,
          AppId: this.app?.id,
        })),
        Messages: payload.Message && [
          {
            ...payload.Message,
            AppId: this.app?.id,
            type: payload.Message.json ? eMessageType.JSON : eMessageType.TEXT,
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
    return data;
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

const useMissedCount = (): iMissedCount => {
  // const [missedCount, setMissedCount] = useState<iMissedCount>({ total: 0, byGroup: [], byChat: [] });
  // useEffect(() => {
  //   const promise = Chatty.getMissedCount();
  //   promise.then((data) => setMissedCount(data));
  // }, []);
  // return missedCount;
  const { data } = useQuery(['chatty', 'missed-count'], Chatty.getMissedCount, {
    initialData: {
      total: 0,
      byGroup: [{ name: '', count: 0 }],
      byChat: [{ id: '', count: 0 }]
    }
  });

  return data;
}

const useSocket = ({ id, newChat }: {
  id?: string,
  newChat?: {
    Members: string[];
    distinctKey: string;
    name?: string;
    avatar?: string;
    group?: string;
    data?: any;
  }
}): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.SOCKET_URL!, { query: { id: id, chat: newChat && JSON.stringify(newChat) }, auth: { apikey: Chatty.apiKey } });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

const useChat = ({ id, newChat }: {
  id?: string,
  newChat?: {
    Members: string[];
    distinctKey: string;
    name?: string;
    avatar?: string;
    group?: string;
    data?: any;
  }
}) => {
  const socket = useSocket({ id, newChat });
  const queryClient = useQueryClient();
  // const [chat, setChat] = useState<any>(null);
  // const [messages, setMessages] = useState<string[]>([]);

  const getChat = async () => {
    const { data } = await axios.get(`${process.env.API_URL}/chats/${id}`, { params: newChat });
    return data;
  }

  const { data, refetch } = useQuery(['chatty', 'chat', id], getChat, { initialData: { chat: {}, messages: [] } });

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message: string) => {
      queryClient.setQueryData<string[]>(['chatty', 'chat', id], (prevMessages) => {
        return [...prevMessages!, message];
      });
    });

    return () => {
      socket.off('message');
    };
  }, [socket, queryClient]);

  const sendMessage = (text: string) => {
    if (!socket) return;
    socket.emit('message', text);
  };

  return {
    chat: data.chat,
    messages: data.messages,
    sendMessage
  };
};

const useMessages = ({ id, newChat }: {
  id?: string,
  newChat?: {
    Members: string[];
    distinctKey: string;
    name?: string;
    avatar?: string;
    group?: string;
    data?: any;
  }
}) => {
  const socket = useSocket({ id, newChat });
  const queryClient = useQueryClient();
  // const [chat, setChat] = useState<any>(null);
  // const [messages, setMessages] = useState<string[]>([]);

  const getChat = async () => {
    const { data } = await axios.get(`${process.env.API_URL}/chats/${id}`, { params: newChat });
    return data;
  }

  const { data, refetch } = useQuery(['chatty', 'chat', id, 'messages'], getChat, { initialData: { chat: {}, messages: [] } });

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message: string) => {
      queryClient.setQueryData<string[]>(['chatty', 'chat', id, 'messages'], (prevMessages) => {
        return [...prevMessages!, message];
      });
    });

    return () => {
      socket.off('message');
    };
  }, [socket, queryClient]);

  const sendMessage = (text: string) => {
    if (!socket) return;
    socket.emit('message', text);
  };

  return {
    chat: data.chat,
    messages: data.messages,
    sendMessage
  };
};


export {
  Chatty,
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