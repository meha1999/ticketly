import { BaseService } from "./base.service";

export class OrderService extends BaseService {
  getOrders() {
    return this.axiosInstanceWithToken.get("/order/");
  }
}
