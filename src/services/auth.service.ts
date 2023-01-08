// custom

import { BaseService } from "./base.service";

export class AuthService extends BaseService {
  login(
    payload: any,
    type: "mechanic" | "admin" | "evaluator" | "supplier"
  ): Promise<any> {
    const userType = {
      admin: "/superuser/",
      evaluator: "/staff/",
      mechanic: "/",
      supplier: "/supplier/",
    };
    return this.axiosInstanceWithoutToken.post(
      `/auth/login${userType[type]}`,
      payload
    );
  }

  signUp(
    payload: any,
    type: "mechanic" | "admin" | "evaluator" | "supplier"
  ): Promise<any> {
    const userType = {
      admin: "/superuser/",
      evaluator: "/staff/",
      mechanic: "/",
      supplier: "/supplier/",
    };
    return this.axiosInstanceWithoutToken.post(
      `/account/user${userType[type]}`,
      payload
    );
  }

  getUser() {
    return this.axiosInstanceWithToken.get("auth/user/");
  }
}
