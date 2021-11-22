import styles from "../../styles/authForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import AuthService from "../../services/authService";

const login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [buttonText, setButtonText] = useState("Send OTP");
    const [error, setError] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidateForm()) {
            setLoading(true);
            setError("");

            if (otpSent) {
                const response = await new AuthService().resetPassword(
                    email,
                    otp,
                    password
                );

                if (response.status === "ok") {
                    router.push("/login");
                } else {
                    setError(response.error);
                    setLoading(false);
                }
            } else {
                const response = await new AuthService().sendOtp(email.trim());
                if (response.status === "ok") {
                    setOtpSent(true);
                    setButtonText("Reset password");
                } else {
                    setError(response.error);
                }
                setLoading(false);
            }
        }
    };

    const isValidateForm = () => {
        if (otpSent) {
            if (!email) {
                setError("Email is required");
                return false;
            }
            if (!otp) {
                setError("OTP is required");
                return false;
            }
            if (!password) {
                setError("Password is required");
                return false;
            }
            if (password.length < 8) {
                setError("Minimum password length must be 8 characters");
                return false;
            }
        } else {
            if (!email) {
                setError("Email is required");
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
                    <p
                        className={`${styles.errorMessage} ${
                            error && styles.show
                        }`}
                    >
                        {error}
                    </p>
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

                    <Link href="/login">
                        <a>Login instead?</a>
                    </Link>

                    <div className={styles.circle} />
                    <div className={styles.squircle} />
                </div>
            </div>
        </>
    );
};

export default login;
