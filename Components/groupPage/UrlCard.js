import styles from "../../styles/urlcard.module.css";
import { useState } from "react";
import { connect } from "react-redux";
import {
    deleteUrl as deleteUrlAction,
    updateUrl as updateUrlAction,
} from "../../redux/action/url";
import ApiService from "../../services/apiService";

const UrlCard = ({ url, deleteUrlAction, updateUrlAction }) => {
    const [title, setTitle] = useState(url.title);
    const [fullUrl, setFullUrl] = useState(url.fullUrl);

    const [copiedUrl, setCopiedUrl] = useState(false);

    const [editing, setEditing] = useState(false);
    const [expandDropdown, setExpandDropdown] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteUrl = async () => {
        if (url) {
            setLoading(true);

            const response = await new ApiService().deleteUrl(
                url.groupID,
                url.urlID
            );

            if (response.status === "ok") {
                deleteUrlAction(url.urlID);
            }

            setLoading(false);
        }
    };

    const showUrlInfoFunction = () => {
        setShowInfo(!showInfo);
        setExpandDropdown(false);
    };

    const startEditing = () => {
        setExpandDropdown(false);
        setEditing(true);
    };

    const cancelEditing = () => {
        setEditing(false);
        setTitle(url.title);
        setFullUrl(url.fullUrl);
    };

    const updateUrl = async (e) => {
        e.preventDefault();

        if (url) {
            setLoading(true);

            const response = await new ApiService().updateUrl(
                url.groupID,
                url.urlID,
                title,
                fullUrl
            );

            if (response.status === "ok") {
                updateUrlAction(url.urlID, title, fullUrl);
                setEditing(false);
            }

            setLoading(false);
        }
    };

    const copyUrl = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedUrl(true);
        setTimeout(() => {
            setCopiedUrl(false);
        }, 1000);
    };

    const urlShareLink = `/${url.urlID}`;

    return (
        <>
            <div className={styles.card}>
                <form onSubmit={(e) => updateUrl(e)}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" value="Title" />
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="URL title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={!editing}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="fullUrl" value="Full URL" />
                        <input
                            id="fullUrl"
                            type="url"
                            name="fullUrl"
                            placeholder="Redirect URL"
                            value={fullUrl}
                            onChange={(e) => setFullUrl(e.target.value)}
                            disabled={!editing}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        {!editing ? (
                            <>
                                <button
                                    type="button"
                                    className={styles.formButton}
                                    style={{
                                        backgroundColor: "#008a99",
                                        marginRight: "5px",
                                    }}
                                    onClick={() => copyUrl(urlShareLink)}
                                >
                                    <img
                                        src={
                                            copiedUrl
                                                ? "/icon/tick.png"
                                                : "/icon/copy.png"
                                        }
                                        alt="Copy URL"
                                    />
                                </button>

                                <div className={styles.expandable}>
                                    <button
                                        type="button"
                                        className={styles.formButton}
                                        onClick={() =>
                                            setExpandDropdown(!expandDropdown)
                                        }
                                        style={{
                                            backgroundColor: "#008a99",
                                            transform: "rotateZ(180deg)",
                                        }}
                                    >
                                        <img
                                            src="/icon/expand.png"
                                            alt="Expand"
                                        />
                                    </button>
                                    <div
                                        className={`${styles.dropdown} ${
                                            !editing &&
                                            expandDropdown &&
                                            styles.expand
                                        }`}
                                    >
                                        <ul>
                                            <li onClick={() => startEditing()}>
                                                Edit
                                            </li>
                                            <li
                                                disabled={loading}
                                                onClick={() => deleteUrl()}
                                            >
                                                Delete
                                            </li>
                                            <li
                                                onClick={() =>
                                                    showUrlInfoFunction()
                                                }
                                            >
                                                Info
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className={styles.formButton}
                                    style={{
                                        backgroundColor: "#ff6666",
                                        marginRight: "5px",
                                    }}
                                    onClick={() => cancelEditing()}
                                >
                                    <img src="/icon/cancel.png" alt="Cancel" />
                                </button>

                                <button
                                    type="submit"
                                    className={styles.formButton}
                                    style={{
                                        backgroundColor: "#0d6efd",
                                    }}
                                    disabled={loading}
                                >
                                    <img src="/icon/save.png" alt="Cancel" />
                                </button>
                            </>
                        )}
                    </div>
                </form>

                <div
                    className={`${styles.modal} ${
                        showInfo && url && styles.show
                    }`}
                >
                    <div className={styles.urlInfoContainer}>
                        <div className={styles.urlInfo}>
                            <h3 className={styles.urlInfoTitle}>URL link</h3>
                            <p className={styles.urlInfoDescription}>
                                {urlShareLink}
                            </p>
                        </div>

                        <div className={styles.urlInfo}>
                            <h3 className={styles.urlInfoTitle}>URL title</h3>
                            <p className={styles.urlInfoDescription}>
                                {url.title}
                            </p>
                        </div>

                        <div className={styles.urlInfo}>
                            <h3 className={styles.urlInfoTitle}>
                                URL redirect link
                            </h3>
                            <p className={styles.urlInfoDescription}>
                                {url.fullUrl}
                            </p>
                        </div>

                        <div className={styles.urlInfo}>
                            <h3 className={styles.urlInfoTitle}>URL visits</h3>
                            <p className={styles.urlInfoDescription}>
                                {url.visits}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.formButton}
                        style={{ backgroundColor: "#6c757d" }}
                        onClick={() => setShowInfo(false)}
                    >
                        Collapse
                    </button>
                    <hr />
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUrlAction: (urlID) => dispatch(deleteUrlAction(urlID)),
        updateUrlAction: (urlID, title, fullUrl) =>
            dispatch(updateUrlAction(urlID, title, fullUrl)),
    };
};

export default connect(null, mapDispatchToProps)(UrlCard);
