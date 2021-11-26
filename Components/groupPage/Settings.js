import styles from "../../styles/groupPage.module.css";
import ApiService from "../../services/apiService";
import { useRouter } from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import {
    updateActiveGroupTitle as updateActiveGroupTitleAction,
    updateActiveGroupPublic as updateActiveGroupPublicAction,
    deleteGroup as deleteGroupAction,
} from "../../redux/action/urlGroup";
import { deleteUrls as deleteUrlsAction } from "../../redux/action/url";

const Settings = ({
    group,
    updateActiveGroupTitleAction,
    updateActiveGroupPublicAction,
    deleteGroupAction,
    deleteUrlsAction,
}) => {
    const router = useRouter();

    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteGroup, setShowDeleteGroup] = useState(false);
    const [showDeleteAllUrls, setShowDeleteAllUrls] = useState(false);

    const [title, setTitle] = useState("");

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);

    const updateMessage = (message, isError = false) => {
        setMessage(message);
        setIsMessageError(isError);
    };

    const handleupdateGroupTitle = async (e) => {
        e.preventDefault();

        if (isValidateUpdateTitleForm()) {
            setLoading(true);

            const response = await new ApiService().updateGroupTitle(
                group.groupID,
                title.trim()
            );

            if (response.status === "ok") {
                updateActiveGroupTitleAction(response.title);
                updateMessage("Group title updated successfully");
                setTitle("");
            } else {
                updateMessage(response.error, true);
            }
        }
        setLoading(false);
    };

    const isValidateUpdateTitleForm = () => {
        if (!title) {
            updateMessage("Title is required", true);
            return false;
        }
        return true;
    };

    const updateGroupVisibility = async () => {
        setLoading(true);

        const response = await new ApiService().updateGroupVisibility(
            group.groupID,
            !group.public
        );

        if (response.status === "ok") {
            updateActiveGroupPublicAction(response.public);
            updateMessage("Group visibility updated successfully");
        } else {
            updateMessage(response.error, true);
        }

        setLoading(false);
    };

    const deleteGroup = async () => {
        setLoading(true);

        const response = await new ApiService().deleteGroup(group.groupID);

        if (response.status === "ok") {
            deleteGroupAction(group.groupID);
            router.push("/user");
        } else {
            updateMessage(response.error, true);
        }

        setShowDeleteGroup(false);
        setLoading(false);
    };

    const deleteAllUrls = async () => {
        setLoading(true);

        const response = await new ApiService().deleteUrls(group.groupID);

        if (response.status === "ok") {
            deleteUrlsAction();
            updateMessage("Urls deleted successfully");
        } else {
            updateMessage(response.error, true);
        }

        setShowDeleteAllUrls(false);
        setLoading(false);
    };

    return (
        <>
            <div className={styles.settingsContainer}>
                <div className={styles.settingsHeader}>
                    <h1>Group settings</h1>
                    <button
                        type="button"
                        className={styles.formButton}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? "Close x" : "Expand"}
                    </button>
                </div>

                <div className={`${styles.setting} ${expand && styles.expand}`}>
                    <hr />

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
                        <h2>Update group title</h2>
                        <form
                            onSubmit={(e) => {
                                handleupdateGroupTitle(e);
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="title" value="Title" />
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="New group title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.formButton}
                                disabled={loading}
                            >
                                Update
                            </button>
                        </form>
                    </div>

                    <div className={styles.mt30}>
                        <h2>Change group visibility</h2>

                        <button
                            type="button"
                            className={styles.formButton}
                            disabled={loading}
                            onClick={() => updateGroupVisibility()}
                        >
                            {group.public ? "Set to private" : "Set to public"}
                        </button>
                    </div>

                    <div className={styles.mt30}>
                        <h2>Delete all urls in this group</h2>

                        <button
                            type="button"
                            className={styles.formButton}
                            style={{ backgroundColor: "#ff6666" }}
                            disabled={loading}
                            onClick={() => setShowDeleteAllUrls(true)}
                        >
                            Delete Urls
                        </button>
                    </div>

                    <div className={styles.mt30}>
                        <h2>Delete Group</h2>

                        <button
                            type="button"
                            className={styles.formButton}
                            style={{ backgroundColor: "#ff6666" }}
                            disabled={loading}
                            onClick={() => setShowDeleteGroup(true)}
                        >
                            Delete Group
                        </button>
                    </div>
                </div>
            </div>
            {showDeleteGroup && (
                <div className={styles.modal}>
                    <div className={styles.modalBody}>
                        <h2>Delete whole group?</h2>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#6c757d" }}
                                disabled={loading}
                                onClick={() => setShowDeleteGroup(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#ff6666" }}
                                disabled={loading}
                                onClick={() => deleteGroup()}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteAllUrls && (
                <div className={styles.modal}>
                    <div className={styles.modalBody}>
                        <h2>Delete all urls in this group?</h2>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#6c757d" }}
                                disabled={loading}
                                onClick={() => setShowDeleteAllUrls(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.formButton}
                                style={{ backgroundColor: "#ff6666" }}
                                disabled={loading}
                                onClick={() => deleteAllUrls()}
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

const mapStateToProps = (state) => {
    return {
        group: state.urlGroup.activeGroup,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveGroupTitleAction: (title) =>
            dispatch(updateActiveGroupTitleAction(title)),
        updateActiveGroupPublicAction: (publicGroup) =>
            dispatch(updateActiveGroupPublicAction(publicGroup)),
        deleteUrlsAction: () => dispatch(deleteUrlsAction()),
        deleteGroupAction: (groupID) => dispatch(deleteGroupAction(groupID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
