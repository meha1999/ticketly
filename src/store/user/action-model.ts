// library
import { Action } from "redux";
// custom
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { UserModel } from "src/model/redux/user-model";

export interface userAction extends Action<REDUX_ACTION> {
  payload: UserModel | null;
}
