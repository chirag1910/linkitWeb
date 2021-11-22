export default class AuthService {
    constructor() {
        this.apiBaseUrl = "http://localhost:7000/";
    }

    login = async (email, password) => {
        try {
            const res = await fetch(this.apiBaseUrl + "user/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
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

    signup = async (name, email, password) => {
        try {
            const response = await fetch(this.apiBaseUrl + "user/signup", {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    authGoogle = async (googleData) => {
        try {
            const response = await fetch(this.apiBaseUrl + "user/auth/google", {
                method: "POST",
                body: JSON.stringify({
                    googleToken: googleData.tokenId,
                }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const data = await response.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    sendOtp = async (email) => {
        try {
            const response = await fetch(this.apiBaseUrl + "user/otp", {
                method: "POST",
                body: JSON.stringify({
                    email,
                }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const data = await response.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    resetPassword = async (email, otp, password) => {
        try {
            const response = await fetch(
                this.apiBaseUrl + "user/resetPassword",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        otp,
                        password,
                    }),
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                }
            );
            const data = await response.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    verifyUser = async () => {
        try {
            const response = await fetch(this.apiBaseUrl + "user/", {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };

    logout = async () => {
        try {
            const response = await fetch(this.apiBaseUrl + "user/logout", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                error: "Some error occurred, please try again later",
            };
        }
    };
}
