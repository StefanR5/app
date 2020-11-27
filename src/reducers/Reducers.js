import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducers from "./AuthReducer";

const appReducers = combineReducers({
  authReducers,
  form: formReducer,
});
export default appReducers;
