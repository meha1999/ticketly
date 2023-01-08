// custom
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { userAction } from "./action-model";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

export function reducer(
  prevState: ReduxStoreModel["user"],
  action: userAction
): ReduxStoreModel["user"] {
  switch (action.type) {
    case REDUX_ACTION.SET_USER:
      return action.payload as ReduxStoreModel["user"];
    case REDUX_ACTION.EMPTY_USER:
      return null;
    default:
      return prevState ? prevState : null;
  }
}
