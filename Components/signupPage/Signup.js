import styles from "../../styles/authForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login as loginAction } from "../../redux/action/authentication";

import AuthService from "../../services/authService";

const signup = ({ loginAction }) => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleAuthGoogle = async (googleData) => {
        setLoading(true);
        setError("");

        if (googleData.error) {
            setError("Some error occurred");
            setLoading(false);
        } else {
            const response = await new AuthService().authGoogle(googleData);
            if (response.status === "ok") {
                loginAction(response.name, response.email);
                router.push("/home");
            } else {
                setError(response.error);
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidateForm()) {
            setLoading(true);
            setError("");

            const response = await new AuthService().signup(
                name.trim(),
                email.trim(),
                password.trim()
            );

            if (response.status === "ok") {
                loginAction(response.name, response.email);
                router.push("/home");
            } else {
                setError(response.error);
                setLoading(false);
            }
        }
    };

    const isValidateForm = () => {
        if (!name) {
            setError("Name is required");
            return false;
        }
        if (!email) {
            setError("Email is required");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        if (!confPassword) {
            setError("Confirm password is required");
            return false;
        }
        if (password.length < 8) {
            setError("Minimum password length must be 8 characters");
            return false;
        }
        if (password != confPassword) {
            setError("Passwords doesn't match");
            return false;
        }
        return true;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <h1>Signup</h1>
                    <p
                        className={`${styles.errorMessage} ${
                            error && styles.show
                        }`}
                    >
                        {error}
                    </p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" value="Name" />
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

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

                        <div className={styles.formGroup}>
                            <label
                                htmlFor="confPassword"
                                value="Confirm Password"
                            />
                            <input
                                id="confPassword"
                                type={showPassword ? "text" : "password"}
                                name="confPassword"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) =>
                                    setConfPassword(e.target.value)
                                }
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
                            Signup
                        </button>
                    </form>
                    <Link href="/login">
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

export default connect(null, mapDispatchToProps)(signup);
