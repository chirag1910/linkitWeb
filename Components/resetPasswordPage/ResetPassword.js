import nProgress from "nprogress";
import styles from "../../styles/authForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import ApiService from "../../services/apiService";

const ResetPassword = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);
    const [buttonText, setButtonText] = useState("Send OTP");

    const [otpSent, setOtpSent] = useState(false);

    const [allowResend, setAllowResend] = useState(false);

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

        const response = await new ApiService().sendOtp(email.trim());

        if (response.status === "ok") {
            updateMessage("OTP sent");
            setButtonText("Reset password");
            setAllowResend(false);
            handleAllowResend();
        } else {
            updateMessage(response.error, true);
        }
        setLoading(false);
        nProgress.done();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidateForm()) {
            setLoading(true);
            nProgress.start();
            updateMessage("");

            if (otpSent) {
                const response = await new ApiService().resetPassword(
                    email,
                    otp,
                    password
                );

                if (response.status === "ok") {
                    router.replace("/user/login");
                } else {
                    updateMessage(response.error, true);
                    setLoading(false);
                    nProgress.done();
                }
            } else {
                const response = await new ApiService().sendOtp(email.trim());

                if (response.status === "ok") {
                    updateMessage("OTP sent");
                    setButtonText("Reset password");
                    setOtpSent(true);
                    setAllowResend(false);
                    handleAllowResend();
                } else {
                    updateMessage(response.error, true);
                }
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

        if (otpSent) {
            if (!otp) {
                updateMessage("OTP is required", true);
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
                    <h1>Reset Password</h1>
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
                                disabled={otpSent}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {otpSent && !loading && (
                                <span onClick={handleEmailEdit}>Edit?</span>
                            )}
                        </div>

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
                                <span onClick={handleOtpResend}>Resend?</span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" value="New password" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="New password"
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
                        <a>Login instead?</a>
                    </Link>

                    <div className={styles.circle} />
                    <div className={styles.squircle} />
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
