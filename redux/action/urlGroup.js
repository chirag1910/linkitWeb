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
