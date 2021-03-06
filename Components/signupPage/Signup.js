import nProgress from "nprogress";
import styles from "../../styles/authForm.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login as loginAction } from "../../redux/action/authentication";

import ApiService from "../../services/apiService";

const Signup = ({ loginAction }) => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);
    const [buttonText, setButtonText] = useState("Send OTP");

    const [otpSent, setOtpSent] = useState(false);

    const [allowResend, setAllowResend] = useState(false);

    const [emailFromUrl, setEmailFromUrl] = useState(false);
    const [otpFromUrl, setotpFromUrl] = useState(false);

    useEffect(() => {
        const { email: urlEmail, otp: urlOtp } = router.query;
        if (urlEmail && urlOtp) {
            setEmailFromUrl(true);
            setotpFromUrl(true);
            setEmail(urlEmail);
            setOtp(urlOtp);

            setButtonText("Signup");
            setOtpSent(true);
        }
    }, [router]);

    const updateMessage = (message, isError = false) => {
        setMessage(message);
        setIsMessageError(isError);
    };

    const handleEmailEdit = () => {
        setOtpSent(false);
        setButtonText("Send OTP");
        updateMessage("");
    };

    const handleAllowResend = () => {
        setTimeout(() => {
            setAllowResend(true);
        }, 10 * 1000);
    };

    const handleOtpResend = async () => {
        setLoading(true);
        nProgress.start();
        updateMessage("");

        if (!email) {
            updateMessage("Email is required", true);
            return false;
        }

        const response = await new ApiService().initializeUser(email.trim());

        if (response.status === "ok") {
            updateMessage("OTP Sent");
            setButtonText("Signup");
            setAllowResend(false);
            handleAllowResend();
        } else {
            updateMessage(response.error, true);
        }
        setLoading(false);
        nProgress.done();
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
                loginAction(response.name, response.email, response.avatar);
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

            if (!otpSent) {
                const response = await new ApiService().initializeUser(
                    email.trim()
                );

                if (response.status === "ok") {
                    updateMessage("OTP Sent");
                    setButtonText("Signup");
                    setOtpSent(true);
                    setAllowResend(false);
                    handleAllowResend();
                } else {
                    updateMessage(response.error, true);
                }
                setLoading(false);
                nProgress.done();
            } else {
                const response = await new ApiService().signup(
                    name.trim(),
                    email.trim(),
                    password.trim(),
                    otp
                );

                if (response.status === "ok") {
                    loginAction(response.name, response.email, response.avatar);
                } else {
                    updateMessage(response.error, true);
                    setLoading(false);
                    nProgress.done();
                }
            }
        }
    };

    const isValidateForm = () => {
        if (!email) {
            updateMessage("Email is required", true);
            return false;
        }

        if (otpSent) {
            if (!otp) {
                updateMessage("OTP is required", true);
                return false;
            }
            if (!name) {
                updateMessage("Name is required", true);
                return false;
            }
            if (!password) {
                updateMessage("Password is required", true);
                return false;
            }
            if (password.length < 8) {
                updateMessage(
                    "Minimum password length must be 8 characters",
                    true
                );
                return false;
            }
        }

        return true;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Signup</h1>

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
                        {!emailFromUrl && (
                            <div className={styles.formGroup}>
                                <label htmlFor="email" value="Email" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    disabled={otpSent}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {otpSent && !loading && (
                                    <span onClick={handleEmailEdit}>Edit?</span>
                                )}
                            </div>
                        )}

                        {!otpFromUrl && (
                            <div className={styles.formGroup}>
                                <label htmlFor="otp" value="OTP" />
                                <input
                                    id="otp"
                                    type="number"
                                    minLength="6"
                                    maxLength="6"
                                    name="otp"
                                    placeholder="One time password"
                                    value={otp}
                                    disabled={!otpSent}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                {otpSent && allowResend && !loading && (
                                    <span onClick={handleOtpResend}>
                                        Resend?
                                    </span>
                                )}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="name" value="Name" />
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Full name"
                                value={name}
                                disabled={!otpSent}
                                onChange={(e) => setName(e.target.value)}
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
                                disabled={!otpSent}
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
                            {buttonText}
                        </button>
                    </form>
                    <Link href="/user/login">
                        <a>Already have an account?</a>
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
                                    "Error continuing with google",
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
        loginAction: (name, email, avatar) =>
            dispatch(loginAction(name, email, avatar)),
    };
};

export default connect(null, mapDispatchToProps)(Signup);
