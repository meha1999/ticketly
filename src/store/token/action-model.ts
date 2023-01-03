// library
import { Action } from "redux";
// custom
import { REDUX_ACTION } from "src/enum/redux-action.enum";

export interface TokenActions extends Action<REDUX_ACTION> {
  payload: string | null;
}
