import { BaseService } from "./base.service";

export class ProfileService extends BaseService {
  getProvince() {
    return this.axiosInstanceWithToken.get("address/ostan/");
  }
  getCities(provinceName: string) {
    return this.axiosInstanceWithToken.get("address/shahr/", {
      params: { provinceName },
    });
  }
}
