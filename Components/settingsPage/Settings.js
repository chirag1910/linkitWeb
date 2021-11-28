import nProgress from "nprogress";
import styles from "../../styles/settingsPage.module.css";
import ApiService from "../../services/apiService";
import { useRouter } from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import { changeName as changeNameAction } from "../../redux/action/authentication";
import { deleteAllGroups as deleteAllGroupsAction } from "../../redux/action/urlGroup";
import { logout as logoutAction } from "../../redux/action/authentication";

const Settings = ({
    changeNameAction,
    deleteAllGroupsAction,
    logoutAction,
}) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDeleteAllGroup, setShowDeleteAllGroup] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);

    const updateMessage = (message, isError = false) => {
        setMessage(message);
        setIsMessageError(isError);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (isValidateChangePasswordForm()) {
            setLoading(true);
            nProgress.start();

            const response = await new ApiService().changePassword(
                oldPassword.trim(),
                newPassword.trim()
            );

            if (response.status === "ok") {
                updateMessage("Password changed successfully");
                setOldPassword("");
                setNewPassword("");
            } else {
                updateMessage(response.error, true);
            }
        }
        setLoading(false);
        nProgress.done();
    };

    const handleChangeName = async (e) => {
        e.preventDefault();

        if (isValidateChangeNameForm()) {
            setLoading(true);
            nProgress.start();

            const response = await new ApiService().changeName(name.trim());

            if (response.status === "ok") {
                changeNameAction(name.trim());
                updateMessage("Name changed successfully");
                setName("");
            } else {
                updateMessage(response.error, true);
            }
        }
        setLoading(false);
        nProgress.done();
    };

    const isValidateChangePasswordForm = () => {
        if (!oldPassword) {
            updateMessage("Current password is required", true);
            return false;
        }
        if (!newPassword) {
            updateMessage("New password is required", true);
            return false;
        }
        return true;
    };

    const isValidateChangeNameForm = () => {
        if (!name) {
            updateMessage("New name is required", true);
            return false;
        }
        return true;
    };

    const deleteAllGroups = async () => {
        setLoading(true);
        nProgress.start();

        const response = await new ApiService().deleteAllGroups();

        if (response.status === "ok") {
            deleteAllGroupsAction();
            updateMessage("All groups deleted successfully");
        } else {
            updateMessage(response.error, true);
        }

        setShowDeleteAllGroup(false);
        setLoading(false);
        nProgress.done();
    };

    const deleteAccount = async () => {
        setLoading(true);
        nProgress.start();

        const response = await new ApiService().deleteAccount(password);

        if (response.status === "ok") {
            logoutAction();
            router.push("/");
        } else {
            updateMessage(response.error, true);
        }

        setShowDeleteAccount(false);
        setLoading(false);
        nProgress.done();
    };

    return (
        <>
            <div className={styles.settingsContainer}>
                <div className={styles.settingsHeader}>
                    <h1>Settings</h1>
                </div>

                <hr />

                <div className={styles.setting}>
                    {message && (
                        <p
                            className={`${styles.message} ${
                                isMessageError ? styles.error : styles.success
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    <div>
                        <h2>Change password</h2>
                        <form
                            onSubmit={(e) => {
                                handleChangePassword(e);
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="oldPassword"
                                    value="Current password"
                                />
                                <input
                                    id="oldPassword"
                                    type={showPassword ? "text" : "password"}
                                    name="oldPassword"
                                    placeholder="Current password"
                                    value={oldPassword}
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="newPassword"
                                    value="New password"
                                />
                                <input
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>

                            <label className={styles.checkbox}>
                                Show password
                                <input
                                    type="checkbox"
                                    checked={showPassword}
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
                                Change password
                            </button>
                        </form>
                    </div>

                    <div className={styles.mt30}>
                        <h2>Change name</h2>
                        <form
                            onSubmit={(e) => {
                                handleChangeName(e);
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="name" value="New name" />
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="New name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.formButton}
                                style={{ display: "block" }}
                                disabled={loading}
                            >
                                Change name
                            </button>
                        </form>
                    </div>

                    <div className={styles.mt30}>
                        <h2>Delete all groups</h2>

                        <button
                            type="button"
                            className={styles.formButton}
                            style={{ backgroundColor: "#ff6666" }}
                            disabled={loading}
                            onClick={() => setShowDeleteAllGroup(true)}
                        >
                            Delete groups
                        </button>
                    </div>

                    <div className={styles.mt30}>
                        <h2>Delete account</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowDeleteAccount(true);
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="password" value="Password" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <label className={styles.checkbox}>
                                Show password
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={(e) =>
                                        setShowPassword(e.target.checked)
                                    }
                                />
                                <span className={styles.checkmark}></span>
                            </label>

                            <button
                                type="button"
                                className={styles.formButton}
                                style={{
                                    backgroundColor: "#ff6666",
                                }}
                                disabled={loading}
                                onClick={() => setShowDeleteAccount(true)}
                            >
                                Delete account
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {showDeleteAllGroup && (
                <div className={styles.modal}>
                    <div className={styles.modalBody}>
                        <h2>Delete all groups?</h2>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#6c757d" }}
                                disabled={loading}
                                onClick={() => setShowDeleteAllGroup(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#ff6666" }}
                                disabled={loading}
                                onClick={() => deleteAllGroups()}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteAccount && (
                <div className={styles.modal}>
                    <div className={styles.modalBody}>
                        <h2>
                            Delete account?
                            <br />
                            Action in non revertable
                        </h2>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#6c757d" }}
                                disabled={loading}
                                onClick={() => setShowDeleteAccount(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#ff6666" }}
                                disabled={loading}
                                onClick={() => deleteAccount()}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeNameAction: (name) => dispatch(changeNameAction(name)),
        deleteAllGroupsAction: () => dispatch(deleteAllGroupsAction()),
        logoutAction: () => dispatch(logoutAction()),
    };
};

export default connect(null, mapDispatchToProps)(Settings);
