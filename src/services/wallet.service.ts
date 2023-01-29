import { BaseService } from "./base.service";

export class WalletService extends BaseService {
  getDepositeTransaction() {
    return this.axiosInstanceWithToken.get("/wallet/depositeTransaction/");
  }
}
