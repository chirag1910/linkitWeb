export default class ApiService {
    constructor() {
        this.apiBaseUrl = "http://localhost:7000/";
    }

    callApi = async (url, bodyParams) => {
        try {
            const res = await fetch(this.apiBaseUrl + url, {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(bodyParams),
            });

            const data = await res.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    initializeUser = (email) => {
        return this.callApi("user/init", { email });
    };

    signup = (name, email, password, otp) => {
        return this.callApi("user/signup", { name, email, password, otp });
    };

    login = (email, password) => {
        return this.callApi("user/login", { email, password });
    };

    authGoogle = (googleData) => {
        return this.callApi("user/auth/google", {
            googleToken: googleData.tokenId,
        });
    };

    sendOtp = (email) => {
        return this.callApi("user/otp", { email });
    };

    resetPassword = (email, otp, password) => {
        return this.callApi("user/resetPassword", { email, otp, password });
    };

    verifyUser = () => {
        return this.callApi("user/get", {});
    };

    logout = () => {
        return this.callApi("user/logout", {});
    };

    changePassword = (oldPassword, newPassword) => {
        return this.callApi("user/changePassword", {
            oldPassword,
            newPassword,
        });
    };

    changeName = (name) => {
        return this.callApi("user/changeName", {
            name,
        });
    };

    deleteAccount = (password) => {
        return this.callApi("user/delete", { password });
    };

    createGroup = (title, publicGroup) => {
        return this.callApi("urlGroup/add", { title, public: publicGroup });
    };

    updateGroupTitle = (groupID, title) => {
        return this.callApi("urlGroup/update", {
            groupID,
            title,
        });
    };

    updateGroupVisibility = (groupID, publicGroup) => {
        return this.callApi("urlGroup/update", {
            groupID,
            public: publicGroup,
        });
    };

    getGroup = (groupID) => {
        return this.callApi("urlGroup/get", { groupID });
    };

    getGroups = () => {
        return this.callApi("urlGroup/getAll", {});
    };

    deleteGroup = (groupID) => {
        return this.callApi("urlGroup/delete", { groupID });
    };

    deleteAllGroups = () => {
        return this.callApi("urlGroup/deleteAll");
    };

    getPublicGroup = (groupID) => {
        return this.callApi("urlGroup/public/get", { groupID });
    };

    createUrl = (groupID, title, fullUrl) => {
        return this.callApi("url/add", { groupID, title, fullUrl });
    };

    updateUrl = (groupID, urlID, title, fullUrl) => {
        return this.callApi("url/update", { groupID, urlID, title, fullUrl });
    };

    getUrls = (groupID) => {
        return this.callApi("url/getAll", { groupID });
    };

    getTotalUrlCount = () => {
        return this.callApi("url/TotalCount", {});
    };

    getTotalUrlVisits = () => {
        return this.callApi("url/TotalVisits");
    };

    deleteUrl = (groupID, urlID) => {
        return this.callApi("url/delete", { groupID, urlID });
    };

    deleteUrls = (groupID) => {
        return this.callApi("url/deleteAll", { groupID });
    };
}
