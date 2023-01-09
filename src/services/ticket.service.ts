import { BaseService } from "./base.service";

export class TicketService extends BaseService {
  getTickets() {
    return this.axiosInstanceWithToken.get("/ticket/");
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
