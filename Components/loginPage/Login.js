import nProgress from "nprogress";
import styles from "../../styles/authForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login as loginAction } from "../../redux/action/authentication";

import ApiService from "../../services/apiService";

const Login = ({ loginAction }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);

    const updateMessage = (message, isError = false) => {
        setMessage(message);
        setIsMessageError(isError);
    };

    const handleAuthGoogle = async (googleData) => {
        setLoading(true);
        nProgress.start();
        updateMessage("");

        if (googleData.error) {
            updateMessage("Some error occurred", true);
            setLoading(false);
            nProgress.done();
        } else {
            const response = await new ApiService().authGoogle(googleData);
            if (response.status === "ok") {
                loginAction(response.name, response.email);
            } else {
                updateMessage("Some error occurred", true);
                setLoading(false);
                nProgress.done();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidateForm()) {
            setLoading(true);
            nProgress.start();
            updateMessage("");

            const response = await new ApiService().login(
                email.trim(),
                password.trim()
            );

            if (response.status === "ok") {
                loginAction(response.name, response.email);
            } else {
                updateMessage(response.error, true);
                setLoading(false);
                nProgress.done();
            }
        }
    };

    const isValidateForm = () => {
        if (!email) {
            updateMessage("Email is required", true);
            return false;
        }
        if (!password) {
            updateMessage("Password is required", true);
            return false;
        }
        return true;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Login</h1>
                    {message && (
                        <p
                            className={`${styles.message} ${
                                isMessageError ? styles.error : styles.success
                            }`}
                        >
                            {message}
                        </p>
                    )}
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" value="Email" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" value="Password" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <label className={styles.checkbox}>
                            Show password
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setShowPassword(e.target.checked)
                                }
                            />
                            <span className={styles.checkmark}></span>
                        </label>

                        <button
                            type="submit"
                            className={styles.formButton}
                            disabled={loading}
                        >
                            Login
                        </button>
                    </form>

                    <Link href="/user/resetPassword">
                        <a>Forgot password?</a>
                    </Link>

                    <Link href="/user/signup">
                        <a>Don&apos;t have an account?</a>
                    </Link>

                    <div className={styles.orHr}>
                        <p>or</p>
                        <hr />
                    </div>

                    <div className={styles.googleLogin}>
                        <GoogleLogin
                            clientId={process.env.GOOGLE_CLIENT_ID}
                            buttonText="Continue with google"
                            onSuccess={handleAuthGoogle}
                            onFailure={() =>
                                updateMessage(
                                    "Sorry, continue with google won't work",
                                    true
                                )
                            }
                            cookiePolicy={"single_host_origin"}
                        />
                    </div>

                    <div className={styles.circle} />
                    <div className={styles.squircle} />
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (name, email) => dispatch(loginAction(name, email)),
    };
};

export default connect(null, mapDispatchToProps)(Login);
