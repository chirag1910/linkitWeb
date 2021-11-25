import { combineReducers } from "redux";
import auth from "./authentication";
import urlGroup from "./urlGroup";

export default combineReducers({
    auth,
    urlGroup,
});
