import * as types from "../actionType/urlGroup";

export const setGroups = (groups) => {
    return {
        type: types.SET_GROUPS,
        payload: {
            groups,
        },
    };
};

export const addGroup = (groupID, title, publicGroup) => {
    return {
        type: types.ADD_GROUP,
        payload: {
            groupID,
            title,
            public: publicGroup,
        },
    };
};

export const deleteGroup = (groupID) => {
    return {
        type: types.DELETE_GROUP,
        payload: {
            groupID,
        },
    };
};

export const deleteAllGroups = () => {
    return {
        type: types.DELETE_ALL_GROUPS,
        payload: [],
    };
};

export const setActiveGroup = (groupID, title, publicGroup) => {
    return {
        type: types.SET_ACTIVE_GROUP,
        payload: {
            group: {
                groupID,
                title,
                public: publicGroup,
            },
        },
    };
};

export const updateActiveGroupTitle = (title) => {
    return {
        type: types.UPDATE_ACTIVE_GROUP_TITLE,
        payload: {
            title,
        },
    };
};

export const updateActiveGroupPublic = (publicGroup) => {
    return {
        type: types.UPDATE_ACTIVE_GROUP_PUBLIC,
        payload: {
            public: publicGroup,
        },
    };
};
