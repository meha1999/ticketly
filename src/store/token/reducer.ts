// custom
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { TokenActions } from "./action-model";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

export function reducer(
  prevState: ReduxStoreModel["token"],
  action: TokenActions
): ReduxStoreModel["token"] {
  switch (action.type) {
    case REDUX_ACTION.SET_TOKEN:
      return action.payload;
    case REDUX_ACTION.EMPTY_TOKEN:
      return action.payload;
    default:
      return prevState ? prevState : null;
  }
}
