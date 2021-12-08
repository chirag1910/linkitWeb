import * as types from "../actionType/authentication";

export const login = (name, email, avatar) => {
    return {
        type: types.LOGIN,
        payload: {
            name,
            email,
            avatar,
        },
    };
};

export const logout = () => {
    return {
        type: types.LOGOUT,
        payload: null,
    };
};

export const changeName = (name) => {
    return {
        type: types.CHANGE_NAME,
        payload: {
            name,
        },
    };
};
