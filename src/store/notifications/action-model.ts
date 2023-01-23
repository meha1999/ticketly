// library
import { Action } from "redux";
// custom
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { NotificationsModel } from "src/model/redux/notification-model";

export interface notificationsAction extends Action<REDUX_ACTION> {
  payload: NotificationsModel | null;
}
