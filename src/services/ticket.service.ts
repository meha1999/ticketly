import { BaseService } from "./base.service";

export class TicketService extends BaseService {
  getTickets() {
    return this.axiosInstanceWithToken.get("/ticket/");
  }
  getGroups(groupId: string) {
    return this.axiosInstanceWithToken.get(`/ticket/group/${groupId}/`);
  }
}
