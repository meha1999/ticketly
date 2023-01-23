// custom
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { notificationsAction } from "./action-model";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

export function reducer(
  prevState: ReduxStoreModel["notification"],
  action: notificationsAction
): ReduxStoreModel["notification"] {
  switch (action.type) {
    case REDUX_ACTION.SET_NOTIFICATION:
      return action.payload as ReduxStoreModel["notification"];
    case REDUX_ACTION.EMPTY_NOTIFICATION:
      return null;
    default:
      return prevState ? prevState : null;
  }
}
