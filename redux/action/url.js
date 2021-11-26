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

export const deleteUrl = (groupID, urlID) => {
    return {
        type: types.DELETE_URL,
        payload: {
            groupID,
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

// export const updateActiveGroupTitle = (title) => {
//     return {
//         type: types.UPDATE_ACTIVE_GROUP_TITLE,
//         payload: {
//             title,
//         },
//     };
// };

// export const updateActiveGroupPublic = (publicGroup) => {
//     return {
//         type: types.UPDATE_ACTIVE_GROUP_PUBLIC,
//         payload: {
//             public: publicGroup,
//         },
//     };
// };
