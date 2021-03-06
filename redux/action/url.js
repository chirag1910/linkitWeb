import * as types from "../actionType/url";

export const setUrls = (urls) => {
    return {
        type: types.SET_URLS,
        payload: {
            urls,
        },
    };
};

export const addUrl = (groupID, urlID, title, fullUrl, visits) => {
    return {
        type: types.ADD_URL,
        payload: {
            groupID,
            urlID,
            title,
            fullUrl,
            visits,
        },
    };
};

export const deleteUrl = (urlID) => {
    return {
        type: types.DELETE_URL,
        payload: {
            urlID,
        },
    };
};

export const deleteUrls = () => {
    return {
        type: types.DELETE_URLS,
        payload: [],
    };
};

export const updateUrl = (urlID, title, fullUrl) => {
    return {
        type: types.UPDATE_URL,
        payload: {
            urlID,
            title,
            fullUrl,
        },
    };
};
