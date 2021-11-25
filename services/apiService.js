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

    deleteAccount = () => {
        return this.callApi("user/delete", {});
    };

    createGroup = (title, publicGroup) => {
        return this.callApi("urlGroup/add", { title, public: publicGroup });
    };

    getGroups = () => {
        return this.callApi("urlGroup/getAll", {});
    };

    getTotalUrlCount = () => {
        return this.callApi("url/TotalCount", {});
    };

    getTotalUrlVisits = () => {
        return this.callApi("url/TotalVisits");
    };
}
