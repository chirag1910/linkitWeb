import * as types from "../actionType/authentication";

const INITIAL_STATE = {
    user: null,
};

const authentication = (state = INITIAL_STATE, action) => {
    if (action.type === types.LOGIN) {
        return {
            ...state,
            user: action.payload,
        };
    } else if (action.type === types.LOGOUT) {
        return {
            ...state,
            user: action.payload,
        };
    } else if (action.type === types.CHANGE_NAME) {
        return {
            ...state,
            user: { ...state.user, name: action.payload.name },
        };
    } else {
        return state;
    }
};

export default authentication;
