import { BaseService } from "./base.service";

export class NotificationService extends BaseService {
  getNotifications() {
    return this.axiosInstanceWithToken.get("/predefined/unread/");
  }
 
}
