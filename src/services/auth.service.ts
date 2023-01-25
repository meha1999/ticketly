// custom

import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { BaseService } from "./base.service";

export class AuthService extends BaseService {
  login(
    payload: any,
    type: "customer" | "superuser" | "staff" | "supplier"
  ): Promise<any> {
    const userType = {
      superuser: "/superuser/",
      staff: "/staff/",
      customer: "/",
      supplier: "/supplier/",
    };
    return this.axiosInstanceWithoutToken.post(
      `/auth/login${userType[type]}`,
      payload
    );
  }

  signUp(
    payload: any,
    type: "customer" | "superuser" | "staff" | "supplier"
  ): Promise<any> {
    const userType = {
      superuser: "/superuser/",
      staff: "/staff/",
      customer: "/customer/",
      supplier: "/supplier/",
    };
    return this.axiosInstanceWithoutToken.post(
      `/account/user${userType[type]}register/`,
      payload
    );
  }

  validate(payload: Record<string, any>): Promise<any> {
    return this.axiosInstanceWithoutToken.post(
      `/account/user/validate/`,
      payload
    );
  }

  resendOtp(payload: Record<string, any>): Promise<any> {
    return this.axiosInstanceWithoutToken.post(
      `/account/user/resend/`,
      payload
    );
  }

  logout(): Promise<any> {
    return this.axiosInstanceWithToken.post("/auth/logout/");
  }

  getUser() {
    return this.axiosInstanceWithToken.get("auth/user/");
  }

  userInfoPatch(userInfo: any) {
    return this.axiosInstanceWithToken.patch("auth/user/", userInfo, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  changePassword(data: any) {
    return this.axiosInstanceWithToken.post("/auth/password/change/", data);
  }
}
