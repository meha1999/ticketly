import { BaseService } from "./base.service";

export class TicketService extends BaseService {
  getTickets(staff: boolean) {
    return this.axiosInstanceWithToken.get(
      `/ticket/${staff ? "?negotiant=customer" : ""}`
    );
  }

  getTicketById(id: string) {
    return this.axiosInstanceWithToken.get(`/ticket/${id}/`);
  }

  changeTicketInfo(ticket_id: string, user_info: any) {
    return this.axiosInstanceWithToken.patch(
      `/ticket/${ticket_id}/`,
      user_info
    );
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

  getSuppliersList(role: string) {
    return this.axiosInstanceWithToken.get(`/account/user/?role=${role}`);
  }

  addSuppliersToGroup(id: string, data: any) {
    return this.axiosInstanceWithToken.patch(`/ticket/group/${id}/`, data);
  }

  finalPayment(data: any) {
    return this.axiosInstanceWithToken.post(`/order/`, data);
  }

  confirmOrder(id: string) {
    return this.axiosInstanceWithToken.put(`/order/confirm/${id}/`);
  }
}
