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
import { ChatList } from "./chatlist";


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
      console.warn(`:: ChattyClient init fail`, err.message);
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
      console.warn(":: ChattyClient was not initailized");
      return [];
    }

    return await this.axiosInstance.get("/chats", { params: { AppId: this.app.id, page: page, MemberId: filter.MemberId, group: filter.group, keyword: filter.keyword } })
      .then((res) => Promise.resolve(res.data))
      .catch((message) =>
        Promise.reject({
          message: ":: ChattyClient getChats error - " + message,
        })
      );
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

    const MD5 = function (d) { const result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

    return MD5(inputValue);
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
      // console.warn(`:: ChattyClient Error %O`, error);
      return Promise.reject(error.message);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (!error.response.data) {
          // console.warn(':: ChattyClient Error - ', error.response._response);
          return Promise.reject(error.response._response);
        }

        return Promise.reject(error.response.data.message);
      } else if (error.request) {
        // console.warn(':: ChattyClient Error - Please check network state');
        return Promise.reject("Please check network state");
      } else {
        // console.warn(`:: ChattyClient Error `, error.message);
        return Promise.reject(error.message);
      }
    }
  );

  return axiosInstance;
}

export default Chatty;
export { Chat as ChattyChat, ChatList as ChattyList };
export * as ChattyTypes from "./type";
