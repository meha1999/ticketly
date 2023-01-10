import { BaseService } from "./base.service";

export class TicketService extends BaseService {
  getTickets() {
    return this.axiosInstanceWithToken.get("/ticket/");
  }

  takeTicket(ticket_id: string, user_info:any) {
    return this.axiosInstanceWithToken.patch(`/ticket/${ticket_id}/`, user_info);
  }

  getGroups(groupId: string) {
    return this.axiosInstanceWithToken.get(`/ticket/group/${groupId}/`);
  }

  createTicket(payload: any): Promise<any> {
    return this.axiosInstanceWithToken.post("/ticket/", payload);
  }

  getCategories() {
    return this.axiosInstanceWithToken.get(
      "/product/category/root/trunk/branch/"
    );
  }
}
