import io, { Socket } from "socket.io-client";
import Chatty from ".";
import {
  ChattyEvent,
  iFetchChatsPayload,
  onChatsFetchResponseType,
  onChannelConnectResponseType,
  onChannelConnect,
  onChatsFetch,
  ErrorResponseType,
  iChannelConstructorParams,
  iChatsFilter,
  onChatRefreshResponseType,
  onChatRefresh,
  onChatLeave,
  onChatLeaveResponseType,
} from "./type";

declare const MODE: string;

const dev = MODE === "development" ? "dev" : "";

export class Channel {
  private socket: Socket | undefined;

  /**
   * When need to be filtered by group name, pass the value to constructor
   */
  private filter: iChatsFilter | undefined;

  private onChannelConnect: onChannelConnect | undefined;
  private onChatsFetch: onChatsFetch | undefined;
  private onChatRefresh: onChatRefresh | undefined;
  private onChatLeave: onChatLeave | undefined;

  constructor(payload: iChannelConstructorParams) {
    this.filter = payload.filter;
    this.onChannelConnect = payload.onChannelConnect;
    this.onChatsFetch = payload.onChatsFetch;
    this.onChatRefresh = payload.onChatRefresh;
    this.onChatLeave = payload.onChatLeave;
  }

  connect() {
    const url: string =
      MODE === "none"
        ? "ws://localhost:4400"
        : `wss://${dev}socket.chatty-cloud.com`;

    this.socket = io(`${url}/channel.${Chatty.app?.name}`, {
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
    console.debug(":: Channel disconnected");
  }

  fetchChats(payload: iFetchChatsPayload) {
    this.socket?.emit(ChattyEvent.FETCH_CHATS, payload);
  }

  refreshChat(ChatId: string) {
    this.socket?.emit(ChattyEvent.REFRESH_CHAT, { ChatId: ChatId });
  }

  leaveChat(ChatId: string) {
    this.socket?.emit(ChattyEvent.LEAVE_CHAT, { ChatId: ChatId });
  }

  private addListener() {
    if (!this.socket) {
      console.warn(":: Channel socket is not connected");
      return;
    }

    this.socket.on(
      ChattyEvent.CONNECT_DONE,
      (data: onChannelConnectResponseType) => {
        console.debug(":: Channel CONNECT_DONE", data);
        this.onChannelConnect && this.onChannelConnect(data);

        this.fetchChats({ refresh: true });
      }
    );

    this.socket.on(ChattyEvent.CONNECT_FAIL, (error: ErrorResponseType) => {
      console.warn(":: Channel CONNECT_FAIL", error.message);
      this.onChannelConnect && this.onChannelConnect({ error });
    });

    this.socket.on(
      ChattyEvent.FETCH_CHATS_DONE,
      (data: onChatsFetchResponseType) => {
        console.debug(":: Channel FETCH_CHATS_DONE", data);
        this.onChatsFetch && this.onChatsFetch(data);
      }
    );

    this.socket.on(ChattyEvent.FETCH_CHATS_FAIL, (error: ErrorResponseType) => {
      console.warn(":: Channel FETCH_CHATS_FAIL", error.message);
      this.onChatsFetch && this.onChatsFetch({ error });
    });

    this.socket.on(
      ChattyEvent.REFRESH_CHAT_DONE,
      (data: onChatRefreshResponseType) => {
        console.debug(`:: Channel REFRESH_CHAT_DONE`, data);
        this.onChatRefresh && this.onChatRefresh(data);
      }
    );

    this.socket.on(
      ChattyEvent.REFRESH_CHAT_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: Channel REFRESH_CHAT_FAIL", error.message);
        this.onChatRefresh && this.onChatRefresh({ error });
      }
    );

    this.socket.on(
      ChattyEvent.LEAVE_CHAT_DONE,
      (data: onChatLeaveResponseType) => {
        console.debug(`:: Channel LEAVE_CHAT_DONE`, data);
        this.onChatLeave && this.onChatLeave(data);
      }
    );

    this.socket.on(ChattyEvent.LEAVE_CHAT_FAIL, (error: ErrorResponseType) => {
      console.warn(":: Channel LEAVE_CHAT_FAIL", error.message);
      this.onChatLeave && this.onChatLeave({ error });
    });
  }

  private removeListener() {
    if (!this.socket) {
      console.warn(":: Channel socket is not connected");
      return;
    }

    this.socket.off(ChattyEvent.CONNECT_DONE);
    this.socket.off(ChattyEvent.CONNECT_FAIL);

    this.socket.off(ChattyEvent.FETCH_CHATS_DONE);
    this.socket.off(ChattyEvent.FETCH_CHATS_FAIL);

    this.socket.off(ChattyEvent.REFRESH_CHAT_DONE);
    this.socket.off(ChattyEvent.REFRESH_CHAT_FAIL);

    this.socket.off(ChattyEvent.LEAVE_CHAT_DONE);
    this.socket.off(ChattyEvent.LEAVE_CHAT_FAIL);

    this.socket = undefined;
  }
}
