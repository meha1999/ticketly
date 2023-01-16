// custom

import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { BaseService } from "./base.service";

export class AuthService extends BaseService {
  login(
    payload: any,
    type: "mechanic" | "superuser" | "staff" | "supplier"
  ): Promise<any> {
    const userType = {
      superuser: "/superuser/",
      staff: "/staff/",
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
    type: "mechanic" | "superuser" | "staff" | "supplier"
  ): Promise<any> {
    const userType = {
      superuser: "/superuser/",
      staff: "/staff/",
      mechanic: "/customer/",
      supplier: "/supplier/",
    };
    return this.axiosInstanceWithoutToken.post(
      `/account/user${userType[type]}register/`,
      payload
    );
  }

  logout(): Promise<any> {
    return this.axiosInstanceWithToken.post("/auth/logout/");
  }

  getUser() {
    return this.axiosInstanceWithToken.get("auth/user/");
  }

  userInfoPatch(userInfo: Partial<ReduxStoreModel["user"]>) {
    return this.axiosInstanceWithToken.patch("auth/user/", userInfo);
  }
}
