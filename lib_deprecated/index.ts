import {
  eMessageBy,
  eMessageType,
  iChat,
  iMember,
  iApp,
  iDevice,
  iInitPayload,
  iMissedCount,
  iExitPayload,
  iMembersFilter,
  iCreateChatPayload,
  iUpdateChatPayload,
  iCreateAdminMessagePayload,
  iChatsFilter,
} from "./type";
import axios, { AxiosInstance } from "axios";
import { Chat } from "./chat";
import md5 from "md5";


class Chatty {
  static apiKey: string | undefined;
  static app: iApp | undefined;
  static member: iMember | undefined;
  static axiosInstance: AxiosInstance;

  /**
   * @description static method init is for initialize chatty client. it will initialize apiKey and chat member
   * @param {iInitPayload} payload
   */
  static async init(payload: iInitPayload): Promise<iMissedCount | undefined> {
    try {
      if (!payload.apiKey) {
        return Promise.reject({ message: ":: ChattyClient init fail - apiKey is required" });
      }
      if (!payload.member.id || !payload.member.name) {
        return Promise.reject({ message: ":: ChattyClient init fail - member id and member name is required" });
      }

      let missedCount: iMissedCount | undefined = undefined;
      this.apiKey = payload.apiKey;
      this.axiosInstance = configAxios(this.apiKey);

      const deviceInfo: iDevice = {
        platform: navigator.platform,
        language: navigator.language,
        product: navigator.product,
        userAgent: navigator.userAgent,
        sdkVersion: process.env.VERSION,
      };

      this.app = await this.getApp();
      this.member = await this.upsertMember({
        ...payload.member,
        device: deviceInfo,
        AppId: this.app?.id,
      });
      if (this.app && this.member) {
        console.info(":: ChattyClient init success");
        console.info(":: ChattyClient [App]", this.app);
        console.info(":: ChattyClient [Member]", this.member);
        missedCount = await this.getMissedCount();
      }

      return missedCount;
    } catch (err: any) {
      return Promise.reject({ message: ":: ChattyClient init fail - " + err.message });
    }
  }

  /**
   * @description static method exit is for terminating chatty client. it will destroy Chatty static members
   * @param {iExitPayload} payload
   */
  static async exit(payload: iExitPayload) {
    try {
      if (this.member) {
        if (payload.deleteMember) {
          await this.deleteMember(this.member.id);
        } else {
          await this.upsertMember({
            ...this.member,
            deviceToken: "",
            AppId: this.app?.id,
          });
        }
      }

      this.apiKey = undefined;
      this.app = undefined;
      this.member = undefined;
      this.axiosInstance = undefined;
      console.debug(":: ChattyClient exit success");
    } catch (err: any) {
      console.warn(":: ChattyClient exit fail ", err.message);
    }
  }

  /**
   *                     
  ____ _____  ____  _____
 / __ `/ __ \/ __ \/ ___/
/ /_/ / /_/ / /_/ (__  ) 
\__,_/ .___/ .___/____/  
    /_/   /_/            

   */

  private static async getApp(): Promise<iApp | undefined> {
    if (!this.axiosInstance) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }
    return await this.axiosInstance
      .get(`/apps`)
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({ message: "getApp error - " + message })
      );
  }

  /**
   * 
        __          __      
  _____/ /_  ____ _/ /______
 / ___/ __ \/ __ `/ __/ ___/
/ /__/ / / / /_/ / /_(__  ) 
\___/_/ /_/\__,_/\__/____/  
                            
   */

  /**
   * @description Get chats
   * @param {number} page
   * @param {iChatsFilter} filter
   * @returns {Promise<iChat[]>}
   */
  static async getChats(page: number, filter?: iChatsFilter): Promise<iChat[]> {
    if (!this.axiosInstance || !this.app || !this.member) {
      // console.warn(":: ChattyClient was not initailized");
      Promise.reject({
        message: ":: ChattyClient getChats error - ChattyClient was not initailized",
      })
    }

    const { data } = await this.axiosInstance.get("/chats", {
      params: {
        AppId: this.app.id,
        page: page,
        pageLimit: this.app.chatListPageLimit,
        MemberId: filter.MemberId,
        group: filter.group,
        keyword: filter.keyword,
        order: 'updatedAt',
      }
    });
    return data;
  }

  /**
   * @description Create new chat
   * @param {iCreateChatPayload} payload
   * @returns {Promise<iChat>}
   */
  static async createChat(
    payload: iCreateChatPayload
  ): Promise<iChat | undefined> {
    if (!this.axiosInstance || !this.app) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }

    if (payload.Members && payload.Members.length > this.app.chatCapacity) {
      console.warn(
        ":: ChattyClient createChat error - Maximum chat member count exceeded"
      );
      return;
    }

    const adminMessage = payload.adminMessage;
    delete payload["adminMessage"];

    return await this.axiosInstance
      .post("/chats", {
        ...payload,
        image: payload.image ? { uri: payload.image } : undefined,
        Members: payload.Members?.map((MemberId: string) => ({
          MemberId: MemberId,
          AppId: this.app?.id,
        })),
        Messages: adminMessage
          ? [
            {
              ...adminMessage,
              AppId: this.app?.id,
              type: adminMessage.json ? eMessageType.JSON : eMessageType.TEXT,
              by: eMessageBy.ADMIN,
            },
          ]
          : undefined,
        AppId: this.app?.id,
      })
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({
          message: ":: ChattyClient createChat error - " + message,
        })
      );
  }

  static async leaveChat(ChatId: string): Promise<{ success: Boolean }> {
    if (!this.axiosInstance || !this.app || !this.member) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }

    return await this.axiosInstance
      .delete<Boolean>("/chatmember", {
        params: {
          ChatId: ChatId,
          MemberId: this.member.id
        },
      })
      .then((res) => Promise.resolve({ success: res.data }))
      .catch((message) =>
        Promise.reject({
          message: ":: ChattyClient leaveChat error - " + message,
        })
      );
  }

  /**
   * @description Update existing chat
   * @param {iUpdateChatPayload} payload
   * @returns {Promise<iChat>}
   */
  static async updateChat(
    payload: iUpdateChatPayload
  ): Promise<iChat | undefined> {
    if (!this.axiosInstance || !this.app) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }

    if (payload.Members && payload.Members.length > this.app.chatCapacity) {
      console.warn(
        ":: ChattyClient updateChat error - Maximum chat member count exceeded"
      );
      return;
    }

    const adminMessage = payload.adminMessage;
    delete payload["adminMessage"];

    return await this.axiosInstance
      .put(`/chats`, {
        ...payload,
        image: payload.image ? { uri: payload.image } : undefined,
        Members: payload.Members?.map((MemberId: string) => ({
          MemberId: MemberId,
          AppId: this.app?.id,
        })),
        Messages: adminMessage
          ? [
            {
              ...adminMessage,
              AppId: this.app?.id,
              type: adminMessage.json ? eMessageType.JSON : eMessageType.TEXT,
              by: eMessageBy.ADMIN,
            },
          ]
          : undefined,
        AppId: this.app?.id,
      })
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({
          message: ":: ChattyClient updateChat error - " + message,
        })
      );
  }

  /**
   *                                                   
   ____ ___  ___  ______________ _____ ____  _____
  / __ `__ \/ _ \/ ___/ ___/ __ `/ __ `/ _ \/ ___/
 / / / / / /  __(__  |__  ) /_/ / /_/ /  __(__  ) 
/_/ /_/ /_/\___/____/____/\__,_/\__, /\___/____/  
                               /____/             

   */

  /**
   * @description Create Admin Message. Used only when being aware of a chat's distinctKey not a chat's id. furthermore, if there is no matched chat, create new chat with the distinctKey,
   * @param {iCreateAdminMessagePayload} payload
   * @returns {Promise<iChat>}
   */
  static async createAdminMessage(
    payload: iCreateAdminMessagePayload
  ): Promise<iChat | undefined> {
    if (!this.axiosInstance || !this.app) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }

    if (payload.Members && payload.Members.length > this.app.chatCapacity) {
      console.warn(
        ":: ChattyClient createAdminMessage error - Maximum chat member count exceeded"
      );
      return;
    }
    const adminMessage = payload.adminMessage;
    delete payload["adminMessage"];

    return await this.axiosInstance
      .post(`/messages`, {
        ...payload,
        image: payload.image ? { uri: payload.image } : undefined,
        Members: payload.Members?.map((MemberId: string) => ({
          MemberId: MemberId,
          AppId: this.app?.id,
        })),
        Messages: adminMessage
          ? [
            {
              ...adminMessage,
              AppId: this.app?.id,
              type: adminMessage.json ? eMessageType.JSON : eMessageType.TEXT,
              by: eMessageBy.ADMIN,
            },
          ]
          : undefined,
        AppId: this.app?.id,
      })
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({
          message: ":: ChattyClient createAdminMessage error - " + message,
        })
      );
  }

  /**
   *     
                             __                  
   ____ ___  ___  ____ ___  / /_  ___  __________
  / __ `__ \/ _ \/ __ `__ \/ __ \/ _ \/ ___/ ___/
 / / / / / /  __/ / / / / / /_/ /  __/ /  (__  ) 
/_/ /_/ /_/\___/_/ /_/ /_/_.___/\___/_/  /____/  
                                                                                      
   */

  /**
   * @description Get members with filters
   * @param {iMembersFilter} filter - member filters
   * @returns {Promise<Array<iMember>>}
   */
  static async getMembers(
    filter: iMembersFilter
  ): Promise<Array<iMember> | undefined> {
    if (!this.axiosInstance || !this.app) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }
    return await this.axiosInstance
      .get(`/members`, {
        params: {
          AppId: this.app.id,
          group: filter.group,
          ChatId: filter.ChatId,
        },
      })
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({
          message: ":: ChattyClient getMembers error - " + message,
        })
      );
  }

  private static async upsertMember(
    member: Partial<iMember>
  ): Promise<iMember | undefined> {
    if (!this.axiosInstance) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }
    return await this.axiosInstance
      .put("/members", member)
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({ message: "Chatty.upsertMember error - " + message })
      );
  }

  private static async deleteMember(id: string): Promise<any | undefined> {
    if (!this.axiosInstance || !this.app) {
      console.warn(":: ChattyClient was not initailized");
      return;
    }
    return await this.axiosInstance
      .delete(`/members/${id}`, { params: { AppId: this.app.id } })
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({ message: "Chatty.deleteMember error - " + message })
      );
  }

  /**
   * 
        __      
  ___  / /______
 / _ \/ __/ ___/
/  __/ /_/ /__  
\___/\__/\___/  
                
   */

  /**
   * @description non-socket api for getting distinctKey. this distinctKey is used for making the chat unique
   * @param payload {...payload: string[]} - dynamic parameters of string, best option is id of chat memmbers
   * @returns {string} - return md5 hashed value
   */
  static generateDistinctKey(...payload: Array<string>): string | undefined {
    if (!payload || !payload.length) {
      console.warn(
        ":: ChattyClient generateDistinctKey error - param data is undefined"
      );
      return;
    }

    if (!this.app) {
      console.warn(
        ":: ChattyClient generateDistinctKey error - Chatty was not initialized"
      );
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

  /**
   * @description non-socket api for getting missed count. commonly used for show badge count on chat button
   * @returns {Promise<iMissedCount>}
   */
  static async getMissedCount(): Promise<iMissedCount | undefined> {
    if (!this.axiosInstance || !this.member) {
      console.warn(":: ChattyClient was not initailized (at getMissedCount)");
      return;
    }

    return await this.axiosInstance
      .get(`/missed-count`, { params: { MemberId: this.member.id } })
      .then((res: any) => Promise.resolve(res.data))
      .catch((errorMessage: string) =>
        Promise.reject({
          message: ":: ChattyClient getMissedCount error - " + errorMessage,
        })
      );
  }
}

function configAxios(ApiKey?: string) {
  const axiosInstance = axios.create();
  axiosInstance.defaults.baseURL = process.env.API_URL;
  axiosInstance.defaults.headers.common["ApiKey"] = ApiKey || "";
  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

  axiosInstance.interceptors.request.use(
    function (request) {
      return request;
    },
    function (error) {
      return Promise.reject({ message: ':: ChattyClient Error 1 - ' + error.message });
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (!error.response.data) {
          return Promise.reject({ message: ':: ChattyClient Error 2 - ' + error.response._response });
        }

        return Promise.reject({ message: ':: ChattyClient Error 3 - ' + error.response.data.message });
      } else if (error.request) {
        return Promise.reject({ message: ':: ChattyClient Error - ' + "Please check network state" });
      } else {
        return Promise.reject({ message: ':: ChattyClient Error 4 - ' + error.message });
      }
    }
  );

  return axiosInstance;
}

export default Chatty;
export { Chat as ChattyChat };
export * as ChattyTypes from "./type";
