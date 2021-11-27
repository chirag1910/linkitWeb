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
                (url) => url.urlID !== action.payload.urlID
            ),
        };
    } else if (action.type === types.DELETE_URLS) {
        return {
            ...state,
            urls: action.payload,
        };
    } else if (action.type === types.UPDATE_URL) {
        return {
            ...state,
            urls: state.urls.map((url) =>
                url.urlID === action.payload.urlID
                    ? {
                          ...url,
                          title: action.payload.title,
                          fullUrl: action.payload.fullUrl,
                      }
                    : url
            ),
        };
    } else {
        return state;
    }
};

export default url;
