import { BaseService } from "./base.service";

export class ProfileService extends BaseService {
  getProvince() {
    return this.axiosInstanceWithToken.get("address/ostan/");
  }
  getCities(provinceName: number) {
    return this.axiosInstanceWithToken.get(`address/ostan/shahr/${provinceName}/`);
  }
}

