/**
 * 
  ___          _       _____                  
 | _ ) __ _ __(_)__ __|_   _|  _ _ __  ___ ___
 | _ \/ _` (_-< / _|___|| || || | '_ \/ -_|_-<
 |___/\__,_/__/_\__|    |_| \_, | .__/\___/__/
                            |__/|_|           

 */

export enum eAppState {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
}

export enum eAppPricing {
  FREE = "FREE",
  PRODUCTION = "PRODUCTION",
  ADVANCED = "ADVANCED",
  ENTERPRISE = "ENTERPRISE",
}

export enum eSubscriptionPlan {
  PRODUCTION = "PRODUCTION",
  ADVANCED = "ADVANCED",
  ENTERPRISE = "ENTERPRISE",
}

export enum eAppUserRole {
  OWNER = "OWNER",
  DEVELOPER = "DEVELOPER",
  MANAGER = "MANAGER",
}

export enum eMemberPermission {
  SUPER = "SUPER",
  WRITE = "WRITE",
  READ = "READ",
}

export enum eMessageType {
  TEXT = "TEXT",
  FILE = "FILE",
  JSON = "JSON",
}

export enum eMessageBy {
  USER = "USER",
  ADMIN = "ADMIN",
  SYSTEM = "SYSTEM",
}

export interface iKey {
  id: string;
  value: string;
  createdAt: Date;
  deletedAt: Date | null;
  AppId: string;
}

export interface iApp {
  id: string;
  name: string;
  server: string;
  firebaseCredentials: iFirebaseCredentials | null;
  state: eAppState;
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
  deletedAt: Date | null;
  Keys: Array<iKey>;
  Billing: iBilling | null;
}

export interface iAppUser {
  role: eAppUserRole;
  createdAt: Date;
  updatedAt: Date;
  AppId: string;
  UserId: string;
}

export interface iUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  verification: boolean;
  tfaEnable: boolean;
  token: string;
  tfa: string;
  visitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  Apps: Array<iAppUser>;
}

export interface iChat {
  id: string;
  name: string;
  image: { uri: string };
  lastMessage: iMessage | null;
  data: any | null;
  distinctKey: string | null;
  group: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  AppId: string;
  Members: Array<iMember>;
  _count?: {
    Receipts: number;
  };
}

export interface iMember {
  id: string;
  name: string;
  language: string;
  country: string;
  avatar: string;
  deviceToken: string;
  device: iDevice | null;
  group: string;
  permission: eMemberPermission;
  data: any | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  AppId: string;
  App: iApp;
}

export interface iMessage {
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
  deletedAt: Date | null;
  AppId: string | null;
  ChatId: string;
  SenderId: string | null;
  Sender: iMember | null;
}

export interface iInvitation {
  role: eAppUserRole;
  accept: boolean;
  email: string;
  inviter: string;
  createdAt: Date;
  updatedAt: Date;
  AppId: string;
}

export interface iSubscription {
  id: string;
  plan: eSubscriptionPlan;
  subscriptionId: string;
  orderId: string;
  paymentSource: string;
  facilitatorAccessToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  AppId: string;
}

export interface iBilling {
  id: string;
  mId: string;
  customerKey: string;
  method: string;
  billingKey: string;
  cardCompany: string;
  cardNumber: string;
  cardIssuerCode: string;
  cardAcquirerCode: string;
  cardType: string;
  cardOwnerType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  AppId: string | null;
}

// export interface PaymentAttributes {
//   readonly id: string;
// };

export interface iDevice {
  platform: string;
  language: string;
  product: string;
  userAgent: string;
  sdkVersion?: string;
}

export interface iFile {
  uri: string;
  type: string;
}

export interface iFirebaseCredentials {
  privateKey: string;
  clientEmail: string;
  projectId: string;
}

export interface iAppIndexSignature {
  [key: string]: object | string | boolean | number | Date | null;
}

export interface iTranslationIndexSignature {
  [key: string]: string;
}

export const SupportedImageFormat = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
export const SupportedVideoFormat = ["video/mp4", "video/webm"];
export const SupportedUploadSize = 20000000;

export enum eChattyNotification {
  CHATTY_USER_MESSAGE = "CHATTY_USER_MESSAGE",
  CHATTY_ADMIN_MESSAGE = "CHATTY_ADMIN_MESSAGE",
  CHATTY_SYSTEM_MESSAGE = "CHATTY_SYSTEM_MESSAGE",
}

export interface iInitPayload {
  apiKey: string;
  member: Partial<iMember>;
}

export interface iExitPayload {
  /**
   * Deleting member. It's useful when application user delete account.
   * Default value is false.
   */
  deleteMember?: boolean;
}

export interface iConnectChatPayload {
  /**
   * Required in case of navigating from ChatList
   * It should be a chat id
   */
  at?: string;

  /**
   * Required in case of starting chat by selecting member id not chat id
   * It shoud be an array of member ids
   */
  with?: Array<string>;

  /**
   * This key makes the chat unique
   * When trying to connect with a same distinctKey. always same chat is connected.
   * Whereas, if connect without distinctKey, always new chat is created.
   * Create your own custom key or use generateDistinctKey, static method of Chatty class which returns md5 hashed value.
   * If using generateDistinctKey method, use member ids as parameters
   */
  distinctKey?: string;

  /**
   * Group name for grouping(filtering) chat
   * Used only when creating a new chat
   */
  group?: string;

  /**
   * Chat name
   * Used only when creating a new chat
   */
  name?: string;

  /**
   * Image uri for chat image
   * Used only when creating a new chat
   */
  image?: string;

  /**
   * Extra custom information for chat
   * Size can't exceed 2K
   * Used only when creating a new chat
   */
  data?: any;
}

export interface iCreateChatPayload {
  distinctKey?: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  Members?: Array<string>;
  adminMessage?: {
    text?: string;
    json?: object;
  };
}

export interface iUpdateChatPayload {
  id: string;
  distinctKey?: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  Members?: Array<string>;
  adminMessage?: {
    text?: string;
    json?: object;
  };
}

export interface iCreateAdminMessagePayload {
  distinctKey: string;
  name?: string;
  image?: string;
  group?: string;
  data?: any;
  Members?: Array<string>;
  adminMessage?: {
    text?: string;
    json?: object;
  };
}

export interface iMembersFilter {
  group?: string;
  keyword?: string; // keyword for searching member name
  ChatId?: string;
}

export interface iChatsFilter {
  group?: string;
  keyword?: string; // keyword for searching chat name
  MemberId?: string; // if MemberId is specified, get chats only MemberId included. if not, get all chats created
}

export interface iChatListConstructorParams {
  filter: iChatsFilter;
  onChatListConnect?: onChatListConnect;
  onChatsFetch?: onChatsFetch;
  onChatRefresh?: onChatRefresh;
  onChatLeave?: onChatLeave;
}

export interface iFetchChatsPayload {
  /**
   * if it's true, fetch chats as refresh. (page === 1)
   * if it's false, fetch chats as loadmore. (page > 1)
   */
  refresh?: boolean;

  /**
   * To filter by group, by MemberId
   */
  filter?: iChatsFilter;
}

export interface iFetchMessagesPayload {
  /**
   * if it's true, fetch messages as refresh. (page === 1)
   * if it's false, fetch messages as loadmore. (page > 1)
   */
  refresh?: boolean;
}

/**
 * missedCount should be updated at frontend in below 4 cases
 * 1. when Chatty.init() is called, if it success, then missedCount is returned
 * 2. when receive a new message push notification (refer to data of push notification)
 * 3. when AppState is changed, if AppState become foreground from others, then call Chatty.getMissedCount()
 * 4. when Chat connect or disconnect, it dismiss missed count.
 */
export interface iMissedCount {
  /** total missedCount */
  total: number;

  /** missedCount by group name */
  group?: Array<{ name: string; count: number }>;
  byGroup: Array<{ name: string, count: number }>,

  /** missedCount of all individual chat */
  chat?: Array<{ id: string; count: number }>;
  byChat: Array<{ id: string, count: number }>
}

/** Handler Error ResponseType */
export type ErrorResponseType = { message: string };

/** Chat Handler ResponseType*/
export type onChatConnectResponseType = {
  chat?: iChat,
  refresh?: boolean;
  hasNext?: boolean;
  messages?: Array<iMessage>;
} & {
  error?: ErrorResponseType;
};
export type onChatDisconnectResponseType = {} & { error?: ErrorResponseType };
export type onChatRefreshResponseType = { chat?: iChat } & {
  error?: ErrorResponseType;
};
export type onChatLeaveResponseType = { chat?: iChat } & {
  error?: ErrorResponseType;
};
export type onMessagesFetchResponseType = {
  refresh?: boolean;
  hasNext?: boolean;
  messages?: Array<iMessage>;
} & { error?: ErrorResponseType };
export type onMessageSendResponseType = { message?: iMessage } & {
  error?: ErrorResponseType;
};
export type onMessageReceiveResponseType = { message?: iMessage } & {
  error?: ErrorResponseType;
};
export type onMessagesUpdateResponseType = { messages?: Array<iMessage> } & {
  error?: ErrorResponseType;
};

/** ChatList Handler ResponseType */
export type onChatListConnectResponseType = {
  refresh?: boolean;
  hasNext?: boolean;
  chats?: Array<iChat>;
} & { error?: ErrorResponseType };

export type onChatListDisconnectResponseType = {} & {
  error?: ErrorResponseType;
};
export type onChatsFetchResponseType = {
  refresh?: boolean;
  hasNext?: boolean;
  chats?: Array<iChat>;
} & { error?: ErrorResponseType };

/** Chat Handlers */
export type onChatConnect = (data: onChatConnectResponseType) => void;
export type onMessagesFetch = (data: onMessagesFetchResponseType) => void;
export type onMessageSend = (data: onMessageSendResponseType) => void;
export type onMessageReceive = (data: onMessageReceiveResponseType) => void;
export type onMessagesUpdate = (data: onMessagesUpdateResponseType) => void;

/** ChatList Handlers */
export type onChatListConnect = (data: onChatListConnectResponseType) => void;
export type onChatsFetch = (data: onChatsFetchResponseType) => void;

/** Chat & ChatList Handlers */
export type onChatRefresh = (data: onChatRefreshResponseType) => void;
export type onChatLeave = (data: onChatLeaveResponseType) => void;

/**
 * 
  ___             _      _____                  
  | __|_ _____ _ _| |_ __|_   _|  _ _ __  ___ ___
  | _|\ V / -_) ' \  _|___|| || || | '_ \/ -_|_-<
  |___|\_/\___|_||_\__|    |_| \_, | .__/\___/__/
                              |__/|_|           

  */
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
