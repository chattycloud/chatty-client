import io, { Socket } from "socket.io-client";
import Chatty from ".";
import {
  eChattyEvent,
  iFetchChatsPayload,
  onChatsFetchResponseType,
  onChatListConnectResponseType,
  onChatListConnect,
  onChatsFetch,
  ErrorResponseType,
  iChatListConstructorParams,
  iChatsFilter,
  onChatRefreshResponseType,
  onChatRefresh,
  onChatLeave,
  onChatLeaveResponseType,
} from "./type";

export class ChatList {
  private socket: Socket | undefined;

  /**
   * When need to be filtered by group name, pass the value to constructor
   */
  private filter: iChatsFilter | undefined;

  private onChatListConnect: onChatListConnect | undefined;
  private onChatsFetch: onChatsFetch | undefined;
  private onChatRefresh: onChatRefresh | undefined;
  private onChatLeave: onChatLeave | undefined;

  constructor(payload: iChatListConstructorParams) {
    this.filter = payload.filter;
    this.onChatListConnect = payload.onChatListConnect;
    this.onChatsFetch = payload.onChatsFetch;
    this.onChatRefresh = payload.onChatRefresh;
    this.onChatLeave = payload.onChatLeave;
  }

  connect() {
    this.socket = io(process.env.SOCKET_URL + `/chatlist.${Chatty.app?.name}`, {
      // transports: ["polling", "websocket"],
      transports: ["websocket"],
      query: {
        MemberId: Chatty.member?.id || "",
        AppId: Chatty.app?.id || "",
        filter: (this.filter && JSON.stringify(this.filter)) || "",
      },
      auth: {
        apikey: Chatty.apiKey || "",
      },
      forceNew: true,
    });
    this.addListener();
  }

  disconnect() {
    this.socket?.disconnect();
    this.removeListener();
    console.debug(":: ChatList disconnected");
  }

  fetchChats(payload: iFetchChatsPayload) {
    this.socket?.emit(eChattyEvent.FETCH_CHATS, payload);
  }

  refreshChat(ChatId: string) {
    this.socket?.emit(eChattyEvent.REFRESH_CHAT, { ChatId: ChatId });
  }

  leaveChat(ChatId: string) {
    this.socket?.emit(eChattyEvent.LEAVE_CHAT, { ChatId: ChatId });
  }

  private addListener() {
    if (!this.socket) {
      console.warn(":: ChatList socket is not connected");
      return;
    }

    this.socket.on(
      eChattyEvent.CONNECT_DONE,
      (data: onChatListConnectResponseType) => {
        console.debug(":: ChatList CONNECT_DONE", data);
        this.onChatListConnect && this.onChatListConnect(data);

        // this.fetchChats({ refresh: true }); // server에서 connect와 동시에 fetch가 이루어짐
      }
    );

    this.socket.on(eChattyEvent.CONNECT_FAIL, (error: ErrorResponseType) => {
      console.warn(":: ChatList CONNECT_FAIL", error.message);
      this.onChatListConnect && this.onChatListConnect({ error });
    });

    this.socket.on(
      eChattyEvent.FETCH_CHATS_DONE,
      (data: onChatsFetchResponseType) => {
        console.debug(":: ChatList FETCH_CHATS_DONE", data);
        this.onChatsFetch && this.onChatsFetch(data);
      }
    );

    this.socket.on(eChattyEvent.FETCH_CHATS_FAIL, (error: ErrorResponseType) => {
      console.warn(":: ChatList FETCH_CHATS_FAIL", error.message);
      this.onChatsFetch && this.onChatsFetch({ error });
    });

    this.socket.on(
      eChattyEvent.REFRESH_CHAT_DONE,
      (data: onChatRefreshResponseType) => {
        console.debug(`:: ChatList REFRESH_CHAT_DONE`, data);
        this.onChatRefresh && this.onChatRefresh(data);
      }
    );

    this.socket.on(
      eChattyEvent.REFRESH_CHAT_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: ChatList REFRESH_CHAT_FAIL", error.message);
        this.onChatRefresh && this.onChatRefresh({ error });
      }
    );

    this.socket.on(
      eChattyEvent.LEAVE_CHAT_DONE,
      (data: onChatLeaveResponseType) => {
        console.debug(`:: ChatList LEAVE_CHAT_DONE`, data);
        this.onChatLeave && this.onChatLeave(data);
      }
    );

    this.socket.on(eChattyEvent.LEAVE_CHAT_FAIL, (error: ErrorResponseType) => {
      console.warn(":: ChatList LEAVE_CHAT_FAIL", error.message);
      this.onChatLeave && this.onChatLeave({ error });
    });
  }

  private removeListener() {
    if (!this.socket) {
      console.warn(":: ChatList socket is not connected");
      return;
    }

    this.socket.off(eChattyEvent.CONNECT_DONE);
    this.socket.off(eChattyEvent.CONNECT_FAIL);

    this.socket.off(eChattyEvent.FETCH_CHATS_DONE);
    this.socket.off(eChattyEvent.FETCH_CHATS_FAIL);

    this.socket.off(eChattyEvent.REFRESH_CHAT_DONE);
    this.socket.off(eChattyEvent.REFRESH_CHAT_FAIL);

    this.socket.off(eChattyEvent.LEAVE_CHAT_DONE);
    this.socket.off(eChattyEvent.LEAVE_CHAT_FAIL);

    this.socket = undefined;
  }
}
