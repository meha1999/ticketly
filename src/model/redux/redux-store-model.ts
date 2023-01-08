import { UserModel } from "./user-model";

export interface ReduxStoreModel {
  token: string | null;
  user: UserModel | null;
}
