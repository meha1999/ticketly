// custom

import { BaseService } from "./base.service";

export class ChatService extends BaseService {
  allChats(ticketId: any): Promise<any> {
    return this.axiosInstanceWithToken.get(`/chat/${ticketId}/messages/all/`);
  }

  upload(data: any, config: any): Promise<any> {
    return this.axiosInstanceWithToken.post("/file/upload/", data, config);
  }

  deleteUploadedFile(id: number) {
    return this.axiosInstanceWithToken.delete(`/file/upload/${id}/`);
  }
}
