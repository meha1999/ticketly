// custom

import { BaseService } from "./base.service";

export class AuthService extends BaseService {
  login(payload: any): Promise<any> {
    return this.axiosInstanceWithoutToken.post("/auth/login/", payload);
  }
  
  signUp(payload: any): Promise<any> {
    return this.axiosInstanceWithoutToken.post("/account/user/", payload);
  }
}
