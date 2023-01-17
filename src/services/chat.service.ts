// custom

import { BaseService } from "./base.service";

export class ChatService extends BaseService {
  allChats(ticketId: any): Promise<any> {
    return this.axiosInstanceWithToken.get(`/chat/${ticketId}/messages/all/`);
  }

  upload(payload: any, config: any): Promise<any> {
    return this.axiosInstanceWithToken.put(`/file/upload/`, payload, config);
  }
}
