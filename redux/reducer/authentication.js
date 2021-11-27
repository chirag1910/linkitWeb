import * as types from "../actionType/authentication";
// import ApiService from "../../services/apiService";

// const verifyUser = async () => {
//     const response = await new ApiService().verifyUser();
//     if (response.status == "ok") {
//         return { name: response.name, email: response.email };
//     }
//     return null;
// };

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
