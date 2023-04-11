import React from 'react';
import io, { Socket } from 'socket.io-client';
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

  FETCH_CHATS = "fetch_chats",
  FETCH_CHATS_DONE = "fetch_chats_done",
  FETCH_CHATS_FAIL = "fetch_chats_fail",

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
  MARK_AS_READ_BYPASS = "mark_as_read_bypass",

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
        // const event = new CustomEvent('initialized', {
        //   detail: { initialized: true },
        // });
        // window?.dispatchEvent(event);
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


const useInitialized = (): boolean => {
  const [initialized, setInitialized] = React.useState<boolean>(Chatty.apiKey && Chatty.app && Chatty.member ? true : false);
  React.useEffect(() => {
    if (initialized) return;
    const handleInitialized = (event: CustomEvent) => {
      setInitialized(event.detail.initialized);
    };

    // window.addEventListener('initialized', handleInitialized);
    return () => {
      console.debug(':: ChattyClient useInitialized - remove listener initialized')
      // window?.removeEventListener('initialized', handleInitialized);
    };
  }, []);
  return initialized;
}

// const useSocket = ({ id, newChat }: {
//   id?: string,
//   newChat?: {
//     Members: string[];
//     distinctKey: string;
//     name?: string;
//     avatar?: string;
//     group?: string;
//     data?: any;
//   }
// }): Socket | null => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const newSocket = io(process.env.SOCKET_URL!, { query: { id: id, chat: newChat && JSON.stringify(newChat) }, auth: { apikey: Chatty.apiKey } });
//     setSocket(newSocket);
//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   return socket;
// };

const useChattySocket = ({ id, newChat }: {
  id?: string,
  newChat?: {
    Members: string[];
    distinctKey: string;
    name?: string;
    image?: string;
    group?: string;
    data?: any;
  }
}): { chat: iChat, messages: Array<iMessage> } => {
  const [chat, setChat] = React.useState<iChat>(null);
  const [messages, setMessages] = React.useState<iMessage[]>([]);

  React.useEffect(() => {
    // console.debug('nuno', Chatty.apiKey, Chatty.app, Chatty.member);
    // const socket = io(`${process.env.SOCKET_URL}/chat.${Chatty.app?.name}`, {
    const socket = io(`${process.env.SOCKET_URL}`, {
      // transports: ["websocket"],
      // query: { id: id, Chat: newChat && JSON.stringify(newChat) },
      query: { id: id, Chat: newChat },
      auth: { apiKey: Chatty.apiKey, MemberId: Chatty.member?.id, AppId: Chatty.app?.id },
    });
    // console.warn(':: ChattyClient useChattySocket - socket io', socket);
    socket.on(eChattyEvent.CONNECT_DONE, (res: any) => {
      console.debug(':: ChattyClient useChattySocket - connect', res);
    });
    socket.on(eChattyEvent.CONNECT_FAIL, (res: any) => {
      console.warn(':: ChattyClient useChattySocket - connect error', res);
    });

    return () => {
      // socket.off('message');
      console.warn(':: ChattyClient useChattySocket - socket disconnect');
      socket.close();
    };
  }, []);


  return {
    chat,
    messages,
  };
};

/*
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
  // const [chat, setChat] = useState<any>(null);
  // const [messages, setMessages] = useState<string[]>([]);

  const getChat = async () => {
    const { data } = await axios.get(`${process.env.API_URL}/chats/${id}`, { params: newChat });
    return data;
  }

  // const { data, refetch } = useQuery(['chatty', 'chat', id], getChat, { initialData: { chat: {}, messages: [] } });

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message: string) => {
      // queryClient.setQueryData<string[]>(['chatty', 'chat', id], (prevMessages) => {
      //   return [...prevMessages!, message];
      // });
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (text: string) => {
    if (!socket) return;
    socket.emit('message', text);
  };

  return {
    // chat: data.chat,
    // messages: data.messages,
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
  // const queryClient = useQueryClient();
  // const [chat, setChat] = useState<any>(null);
  // const [messages, setMessages] = useState<string[]>([]);

  const getChat = async () => {
    const { data } = await axios.get(`${process.env.API_URL}/chats/${id}`, { params: newChat });
    return data;
  }

  // const { data, refetch } = useQuery(['chatty', 'chat', id, 'messages'], getChat, { initialData: { chat: {}, messages: [] } });

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message: string) => {
      // queryClient.setQueryData<string[]>(['chatty', 'chat', id, 'messages'], (prevMessages) => {
      //   return [...prevMessages!, message];
      // });
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (text: string) => {
    if (!socket) return;
    socket.emit('message', text);
  };

  return {
    // chat: data.chat,
    // messages: data.messages,
    sendMessage
  };
};
*/

export {
  Chatty,
  useInitialized,
  useChattySocket,
  eMessageBy,
  eMessageType,
  eNotification,
  iMissedCount,
  iChat,
  iMessage,
  iMember
};