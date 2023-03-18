import axios from "axios";
import io, { Socket } from "socket.io-client";
import Chatty from ".";
import { Channel } from "./channel";
import FormData from "form-data";
import {
  iApp,
  iMessage,
  ChattyEvent,
  iConnectChatPayload,
  iFetchMessagesPayload,
  iFile,
  eMessageType,
  eMessageBy,
  ErrorResponseType,
  onMessagesFetchResponseType,
  onChatConnectResponseType,
  onMessagesUpdateResponseType,
  onMessageSendResponseType,
  onMessageReceiveResponseType,
  onChatRefreshResponseType,
  onChatLeaveResponseType,
  onChatConnect,
  onMessageSend,
  onMessagesFetch,
  onMessageReceive,
  onMessagesUpdate,
  onChatRefresh,
  onChatLeave,
  SupportedImageFormat,
  SupportedVideoFormat,
} from "./type";

export type ChatParams = {
  channel?: Channel;
  onChatConnect?: onChatConnect;
  onChatRefresh?: onChatRefresh;
  onChatLeave?: onChatLeave;
  onMessageSend?: onMessageSend;
  onMessagesFetch?: onMessagesFetch;
  onMessageReceive?: onMessageReceive;
  onMessagesUpdate?: onMessagesUpdate;
};

export class Chat {
  private socket: Socket | undefined;
  private channel: Channel | undefined;
  private id: string | undefined; // connected chat id

  private onChatConnect: onChatConnect | undefined;
  private onChatRefresh: onChatRefresh | undefined;
  private onChatLeave: onChatLeave | undefined;
  private onMessageSend: onMessageSend | undefined;
  private onMessagesFetch: onMessagesFetch | undefined;
  private onMessageReceive: onMessageReceive | undefined;
  private onMessagesUpdate: onMessagesUpdate | undefined;

  constructor(payload: ChatParams) {
    this.channel = payload.channel;
    this.onChatConnect = payload.onChatConnect;
    this.onChatRefresh = payload.onChatRefresh;
    this.onChatLeave = payload.onChatLeave;
    this.onMessageSend = payload.onMessageSend;
    this.onMessagesFetch = payload.onMessagesFetch;
    this.onMessageReceive = payload.onMessageReceive;
    this.onMessagesUpdate = payload.onMessagesUpdate;
  }

  /**
   *
   * @param payload
   *
   */
  connect(payload: iConnectChatPayload) {
    if (payload.with) {
      if (typeof payload.with === "string") {
        payload.with = [payload.with];
      }
      payload.with = payload.with.filter(
        (MemberId) =>
          MemberId && MemberId !== "undefined" && MemberId !== "null"
      );
      payload.with.push(Chatty.member?.id!);

      // Remove duplicated elements
      payload.with = payload.with.filter(
        (value, index, self) => self.indexOf(value) === index
      );

      if (payload.with.length < 2) {
        console.warn(
          ":: ChattyChat connect error - chat member count should not be less than 2"
        );
        return;
      }
    }

    if (payload.distinctKey && typeof payload.distinctKey !== "string") {
      console.warn(
        ":: ChattyChat connect error - distinctKey must be string. Use static method Chatty.generateDistinctKey() to generate distinctKey"
      );
      return;
    }

    // payload checker
    Object.keys(payload).forEach((key) => !payload[key] && delete payload[key]);

    this.socket = io(process.env.SOCKET_URL + `/chat.${Chatty.app?.name}`, {
      // transports: ["polling", "websocket"],
      transports: ["websocket"],
      query: {
        MemberId: Chatty.member?.id || "",
        AppId: Chatty.app?.id || "",
        at: payload.at || "",
        with: payload.with || "",
        distinctKey: payload.distinctKey || "",
        group: payload.group || "",
        name: payload.name || "",
        image: payload.image || "",
        data: (payload.data && JSON.stringify(payload.data)) || "",
      },
      auth: {
        apikey: Chatty.apiKey || "",
      },
      forceNew: true,
      // withCredentials: true, // cors "*" 일때는 이값을 설정하면안된다.
    });

    this.addListener();
  }

  disconnect() {
    this.socket?.disconnect();
    this.removeListener();
    console.debug(":: ChattyChat disconnected");
  }

  fetchMessages(payload: iFetchMessagesPayload) {
    this.socket?.emit(ChattyEvent.FETCH_MESSAGES, { refresh: payload.refresh });
  }

  private sendMessage(data: Partial<iMessage>) {
    this.socket?.emit(ChattyEvent.SEND_MESSAGE, { ...data, retry: 5 });
  }

  deleteMessage(id: string) {
    this.socket?.emit(ChattyEvent.DELETE_MESSAGE, { id: id });
  }

  refreshChat(ChatId: string) {
    // chat 화면의 정보 및 참여멤버정보등이 바뀔때 호출이되어야 함
    this.socket?.emit(ChattyEvent.REFRESH_CHAT, { ChatId: ChatId });
  }

  leaveChat(ChatId: string) {
    this.socket?.emit(ChattyEvent.LEAVE_CHAT, { ChatId: ChatId });
  }

  inviteMembers(MemberIds: string[]) {
    this.socket?.emit(ChattyEvent.INVITE_MEMBERS, { MemberIds: MemberIds });
  }

  excludeMembers(MemberIds: string[]) {
    this.socket?.emit(ChattyEvent.EXCLUDE_MEMBERS, { MemberIds: MemberIds });
  }

  markAsRead() {
    this.socket?.emit(ChattyEvent.MARK_AS_READ);
  }

  /**
   *
   * @param text {string} message don't be trimeed before sending as it's a frontend logic.
   * @returns
   */
  sendTextMessage(text: string): Partial<iMessage> | undefined {
    if (!text) {
      console.warn(":: ChattyChat sendTextMessage error - text is empty");
      return;
    }
    if (!this.id) {
      console.warn(
        ":: ChattyChat sendTextMessage error - Chat not connected yet"
      );
      return;
    }
    const message: Partial<iMessage> = {
      id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }),
      createdAt: new Date(),
      text: text,
      type: eMessageType.TEXT,
      by: eMessageBy.USER,
      SenderId: Chatty.member?.id!,
    };
    this.sendMessage(message);

    // return temporary message object before inserting to database
    delete message["SenderId"];
    return { ...message, Sender: Chatty.member };
  }

  sendFileMessage(files: Array<iFile>): Partial<iMessage> | undefined {
    if (!files) {
      console.warn(
        ":: ChattyChat sendFileMessage function param error: files are undefined"
      );
      return;
    }

    if (files.length > 4) {
      console.warn(
        ":: ChattyChat sendFileMessage function param error: number of files can not be over 4"
      );
      return;
    }

    if (!this.id) {
      console.warn(
        ":: ChattyChat sendTextMessage error - Chat not connected yet"
      );
      return;
    }

    const message: Partial<iMessage> = {
      id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }),
      createdAt: new Date(),
      files: files,
      text: "File Message",
      type: eMessageType.FILE,
      by: eMessageBy.USER,
      SenderId: Chatty.member?.id!,
    };

    this.uploadFiles(files)
      .then((files) => {
        console.debug(":: ChattyChat uploadFiles success", files);
        this.sendMessage({ ...message, files: files });
      })
      .catch((err) => {
        console.warn(":: ChattyChat uploadFiles error", err.message);
      });

    // return temporary message object with SenderId before inserting to database
    delete message["SenderId"];
    return { ...message, Sender: Chatty.member };
  }

  private uploadFiles(files: Array<iFile>): Promise<Array<{ uri: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!Chatty.axiosInstance) {
          reject(":: ChattyClient is not initailized");
        }

        if (!validateFiles(files, Chatty.app)) {
          reject(":: ChattyClient uploadFiles - File validations are failed");
        }

        const result = await Promise.all(
          files.map(async (file: any) => {
            const form = new FormData();
            form.append("file", file);

            const uploadUrl = await Chatty.axiosInstance?.get("/uploadurl");
            if (!uploadUrl?.data) {
              reject(":: ChattyClient uploadFiles - Getting uploadUrl failed");
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
                  Chatty.app?.thumbnailSize,
              };
            } else {
              return { uri: "" };
            }
          })
        );

        resolve(result);
      } catch (err: any) {
        console.warn(":: ChattyClient uploadFiles error %O", err);
        reject(err.message);
      }
    });
  }

  /**
   * @deprecated can't be used by user. It's used as BY ADMIN or BY SYSTEM
   * @param json
   * @returns
   */
  sendJsonMessage(json: any): Partial<iMessage> | undefined {
    if (!json) {
      console.warn(
        ":: ChattyChat sendJsonMessage function param error: json param undefined"
      );
      return;
    }

    const message: Partial<iMessage> = {
      id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }),
      createdAt: new Date(),
      json: json,
      text: "Json Message",
      type: eMessageType.JSON,
      by: eMessageBy.USER,
      SenderId: Chatty.member?.id!,
    };

    return { ...message, Sender: Chatty.member };
  }

  private addListener() {
    if (!this.socket) {
      console.warn(":: ChattyChat socket is not connected");
      return;
    }

    this.socket.on(
      ChattyEvent.CONNECT_DONE,
      (data: onChatConnectResponseType) => {
        console.debug(`:: ChattyChat CONNECT_DONE`, data);
        this.id = data.chat?.id; // 연결된 ChatId를 Chat instance에 저장 > 필요한 경우 다시 enable
        this.onChatConnect && this.onChatConnect(data);
        this.fetchMessages({ refresh: true });
      }
    );

    this.socket.on(ChattyEvent.CONNECT_FAIL, (error: ErrorResponseType) => {
      console.warn(":: ChattyChat CONNECT_FAIL", error.message);
      this.onChatConnect && this.onChatConnect({ error });
    });

    this.socket.on(
      ChattyEvent.FETCH_MESSAGES_DONE,
      (data: onMessagesFetchResponseType) => {
        console.debug(":: ChattyChat FETCH_MESSAGES_DONE", data);
        this.onMessagesFetch && this.onMessagesFetch(data);

        this.markAsRead();
      }
    );

    this.socket.on(
      ChattyEvent.FETCH_MESSAGES_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: ChattyChat FETCH_MESSAGES_FAIL", error.message);
        this.onMessagesFetch && this.onMessagesFetch({ error });
      }
    );

    this.socket.on(
      ChattyEvent.SEND_MESSAGE_DONE,
      (data: onMessageSendResponseType) => {
        console.debug(":: ChattyChat SEND_MESSAGE_DONE", data);
        this.onMessageSend && this.onMessageSend(data);

        // 내가 메시지를 보낸게 성공하면 Channel 에서 REFRESH_CHAT 해야한다.
        if (this.channel && this.id) {
          this.channel.refreshChat(this.id);
        }
      }
    );

    this.socket.on(
      ChattyEvent.SEND_MESSAGE_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: ChattyChat SEND_MESSAGE_FAIL", error.message);
        this.onMessageSend && this.onMessageSend({ error });
      }
    );

    this.socket.on(
      ChattyEvent.SEND_MESSAGE_RETRY,
      (data: { retry: number }) => {
        console.debug(":: ChattyChat SEND_MESSAGE_RETRY", data);
        this.socket?.emit(ChattyEvent.SEND_MESSAGE, data);
      }
    );

    this.socket.on(
      ChattyEvent.RECEIVE_MESSAGE,
      (data: onMessageReceiveResponseType) => {
        console.debug(":: ChattyChat RECEIVE_MESSAGE", data);
        this.onMessageReceive && this.onMessageReceive(data);

        this.markAsRead();
      }
    );

    this.socket.on(
      ChattyEvent.MARK_AS_READ_DONE,
      (data: { ChatId: string }) => {
        console.debug(":: ChattyChat MARK_AS_READ_DONE", data);

        // Channel 로부터 왔다면 REFRESH_CHAT 해야한다
        if (this.channel && this.id) {
          this.channel.refreshChat(this.id);
        }
      }
    );

    this.socket.on(
      ChattyEvent.MARK_AS_READ_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: ChattyChat MARK_AS_READ_FAIL", error.message);
      }
    );

    this.socket.on(ChattyEvent.MARK_AS_READ_BYPASS, () => {
      // MARK_AS_READ_DONE의 응답으로  data가 MARK_AS_READ_BYPASS 인경우가 있다.
      // member 가 SUPER인경우에 해당되며 MARK_AS_READ 요청에대해 서버가 bypass로 동작한다
      console.debug(":: ChattyChat MARK_AS_READ_BYPASS");
    });

    /**
     * UPDATE_MESSAGES 는 Server로부터 Emit
     *
     * 1. MARK_AS_READ 는 아래의 경우 발생 > 상대방의 Message Bubble에서 readReceipt를 변경하기 위해서
     * - RECEIVE_MESSAGE 를 받은 후
     * - FETCH_MESSAGES_DONE 을 받은후
     *
     * 2. Server에서 DELETE_MESSAGE가 성공적으로 이루어진후 > Chat Message의 삭제내용을 업데이트
     */
    this.socket.on(
      ChattyEvent.UPDATE_MESSAGES,
      (data: onMessagesUpdateResponseType) => {
        console.debug(":: ChattyChat UPDATE_MESSAGES", data);
        this.onMessagesUpdate && this.onMessagesUpdate(data);
      }
    );

    this.socket.on(
      ChattyEvent.REFRESH_CHAT_DONE,
      (data: onChatRefreshResponseType) => {
        console.debug(`:: ChattyChat REFRESH_CHAT_DONE`, data);
        this.onChatRefresh && this.onChatRefresh(data);
      }
    );

    this.socket.on(
      ChattyEvent.REFRESH_CHAT_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: ChattyChat REFRESH_CHAT_FAIL", error.message);
        this.onChatRefresh && this.onChatRefresh({ error });
      }
    );

    this.socket.on(
      ChattyEvent.LEAVE_CHAT_DONE,
      (data: onChatLeaveResponseType) => {
        console.debug(`:: ChattyChat LEAVE_CHAT_DONE`, data);
        this.onChatLeave && this.onChatLeave(data);
      }
    );

    this.socket.on(ChattyEvent.LEAVE_CHAT_FAIL, (error: ErrorResponseType) => {
      console.warn(":: ChattyChat LEAVE_CHAT_FAIL", error.message);
      this.onChatLeave && this.onChatLeave({ error });
    });

    this.socket.on(
      ChattyEvent.DELETE_MESSAGE_FAIL,
      (error: ErrorResponseType) => {
        console.warn(":: ChattyChat DELETE_MESSAGE_FAIL", error.message);
        this.onMessagesUpdate && this.onMessagesUpdate({ error });
      }
    );
  }

  private removeListener() {
    if (!this.socket) {
      console.warn(":: ChattyChat socket is not connected");
      return;
    }

    this.socket.off(ChattyEvent.CONNECT_DONE);
    this.socket.off(ChattyEvent.CONNECT_FAIL);

    this.socket.off(ChattyEvent.FETCH_MESSAGES_DONE);
    this.socket.off(ChattyEvent.FETCH_MESSAGES_FAIL);

    this.socket.off(ChattyEvent.SEND_MESSAGE_DONE);
    this.socket.off(ChattyEvent.SEND_MESSAGE_FAIL);

    this.socket.off(ChattyEvent.SEND_MESSAGE_RETRY);

    this.socket.off(ChattyEvent.RECEIVE_MESSAGE);

    this.socket.off(ChattyEvent.MARK_AS_READ_DONE);
    this.socket.off(ChattyEvent.MARK_AS_READ_FAIL);
    this.socket.off(ChattyEvent.MARK_AS_READ_BYPASS);

    this.socket.off(ChattyEvent.UPDATE_MESSAGES);

    this.socket.off(ChattyEvent.REFRESH_CHAT_DONE);
    this.socket.off(ChattyEvent.REFRESH_CHAT_FAIL);

    this.socket.off(ChattyEvent.LEAVE_CHAT_DONE);
    this.socket.off(ChattyEvent.LEAVE_CHAT_FAIL);

    this.socket.off(ChattyEvent.DELETE_MESSAGE_FAIL);

    this.socket = undefined;
    this.channel = undefined;
    this.id = undefined;
  }
}

function validateFiles(files: Array<iFile>, app?: iApp): Boolean {
  if (!app) {
    console.warn(":: ChattyClient App is undefined");
    return false;
  }
  if (!files.length) {
    console.warn(":: ChattyClient File param is empty");
    return false;
  }

  files.map((file: iFile) => {
    if (!file.type) {
      console.warn(":: ChattyClient File type is not defined");
      return false;
    }
    if (file.type.split("/")[0] === "image" && !app.enableImageUpload) {
      console.warn(":: ChattyClient Image upload is not enabled");
      return false;
    }

    if (file.type.split("/")[0] === "video" && !app.enableVideoUpload) {
      console.warn(":: ChattyClient Video upload is not enabled");
      return false;
    }

    if (
      file.type.split("/")[0] === "image" &&
      !SupportedImageFormat.includes(file.type)
    ) {
      console.warn(
        `:: ChattyClient Image format '${file.type}' is not supported`
      );
      return false;
    }

    if (
      file.type.split("/")[0] === "video" &&
      !SupportedVideoFormat.includes(file.type)
    ) {
      console.warn(
        `:: ChattyClient Video format '${file.type}' is not supported`
      );
      return false;
    }
  });
  return true;
}
