import { BaseService } from "./base.service";

export class OrderService extends BaseService {
  getOrders() {
    return this.axiosInstanceWithToken.get("/order/");
  }
  changeOrderInfo(order_id: string, user_info: any) {
    return this.axiosInstanceWithToken.patch(`/order/${order_id}/`, user_info);
  }
}
