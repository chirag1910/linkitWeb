import * as types from "../actionType/urlGroup";

const INITIAL_STATE = {
    groups: [],
};

const authentication = (state = INITIAL_STATE, action) => {
    if (action.type === types.SET_GROUPS) {
        return {
            ...state,
            groups: action.payload.groups,
        };
    } else if (action.type === types.ADD_GROUP) {
        return {
            ...state,
            groups: [...state.groups, action.payload],
        };
    } else {
        return state;
    }
};

export default authentication;
