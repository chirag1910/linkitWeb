import * as types from "../actionType/url";

const INITIAL_STATE = {
    urls: [],
};

const url = (state = INITIAL_STATE, action) => {
    if (action.type === types.SET_URLS) {
        return {
            ...state,
            urls: action.payload.urls,
        };
    } else if (action.type === types.ADD_URL) {
        return {
            ...state,
            urls: [...state.urls, action.payload],
        };
    } else if (action.type === types.DELETE_URL) {
        return {
            ...state,
            urls: state.urls.filter(
                (url) =>
                    url.groupID !== action.payload.groupID &&
                    url.urlId !== action.payload.urlID
            ),
        };
    } else if (action.type === types.DELETE_URLS) {
        return {
            ...state,
            urls: action.payload,
        };
        // } else if (action.type === types.UPDATE_ACTIVE_GROUP_TITLE) {
        //     return {
        //         ...state,
        //         activeGroup: {
        //             ...state.activeGroup,
        //             title: action.payload.title,
        //         },
        //     };
        // } else if (action.type === types.UPDATE_ACTIVE_GROUP_PUBLIC) {
        //     return {
        //         ...state,
        //         activeGroup: {
        //             ...state.activeGroup,
        //             public: action.payload.public,
        //         },
        //     };
    } else {
        return state;
    }
};

export default url;
