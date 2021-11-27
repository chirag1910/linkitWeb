import * as types from "../actionType/urlGroup";

const INITIAL_STATE = {
    groups: [],
    activeGroup: {
        title: "Group",
        public: "N/A",
    },
};

const urlGroup = (state = INITIAL_STATE, action) => {
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
    } else if (action.type === types.DELETE_GROUP) {
        return {
            ...state,
            groups: state.groups.filter(
                (group) => group.groupID !== action.payload.groupID
            ),
        };
    } else if (action.type === types.DELETE_ALL_GROUPS) {
        return {
            ...state,
            groups: action.payload,
        };
    } else if (action.type === types.SET_ACTIVE_GROUP) {
        return {
            ...state,
            activeGroup: action.payload.group,
        };
    } else if (action.type === types.UPDATE_ACTIVE_GROUP_TITLE) {
        return {
            ...state,
            activeGroup: {
                ...state.activeGroup,
                title: action.payload.title,
            },
        };
    } else if (action.type === types.UPDATE_ACTIVE_GROUP_PUBLIC) {
        return {
            ...state,
            activeGroup: {
                ...state.activeGroup,
                public: action.payload.public,
            },
        };
    } else {
        return state;
    }
};

export default urlGroup;
