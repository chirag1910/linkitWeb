import { combineReducers } from "redux";
import auth from "./authentication";
import urlGroup from "./urlGroup";
import url from "./url";

export default combineReducers({
    auth,
    urlGroup,
    url,
});
