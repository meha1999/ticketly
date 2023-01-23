import { NotificationsModel } from "./notification-model";
import { UserModel } from "./user-model";

export interface ReduxStoreModel {
  token: string | null;
  user: UserModel | null;
  notification: NotificationsModel | null;
}
