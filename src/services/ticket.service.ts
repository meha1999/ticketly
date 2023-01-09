import { BaseService } from "./base.service";

export class TicketService extends BaseService {
  getTickets() {
    return this.axiosInstanceWithToken.get("/ticket/");
  }
}
