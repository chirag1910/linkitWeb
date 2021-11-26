import styles from "../../styles/groupPage.module.css";
import formStyles from "../../styles/standaloneForm.module.css";
import ApiService from "../../services/apiService";
import { useState } from "react";
import { connect } from "react-redux";
import { addUrl as addUrlAction } from "../../redux/action/url";

const CreateUrl = ({ group, addUrlAction }) => {
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [fullUrl, setFullUrl] = useState("");

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);

    const updateMessage = (message, isError = false) => {
        setMessage(message);
        setIsMessageError(isError);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidateForm()) {
            setLoading(true);

            const response = await new ApiService().createUrl(
                group.groupID,
                title.trim(),
                fullUrl.trim()
            );

            if (response.status === "ok") {
                addUrlAction(
                    response.groupID,
                    response.urlID,
                    response.title,
                    response.fullUrl,
                    response.visits
                );
                setTitle("");
                setFullUrl("");
                updateMessage("URL added successfully");
            } else {
                updateMessage(response.error, true);
            }
            setLoading(false);
        }
    };

    const isValidateForm = () => {
        if (!title) {
            updateMessage("Title is required", true);
            return false;
        }
        if (!fullUrl) {
            updateMessage("FullUrl is required", true);
            return false;
        }
        return true;
    };

    return (
        <div className={styles.createUrlContainer}>
            <div className={styles.createHeader}>
                <h1>Add URL</h1>
                <button
                    type="button"
                    className={formStyles.formButton}
                    onClick={() => {
                        setExpand(!expand);
                    }}
                >
                    {expand ? "Close x" : "Add +"}
                </button>
            </div>
            <div className={`${styles.createForm} ${expand && styles.expand}`}>
                <hr />

                {message && (
                    <p
                        className={`${formStyles.message} ${
                            isMessageError
                                ? formStyles.error
                                : formStyles.success
                        }`}
                    >
                        {message}
                    </p>
                )}

                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className={formStyles.formGroup}>
                        <label htmlFor="title" value="Title" />
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Group title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={formStyles.formGroup}>
                        <label htmlFor="fullUrl" value="Full URL" />
                        <input
                            id="fullUrl"
                            type="url"
                            name="fullUrl"
                            placeholder="Full URL"
                            value={fullUrl}
                            onChange={(e) => setFullUrl(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={formStyles.formButton}
                        disabled={loading}
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        group: state.urlGroup.activeGroup,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUrlAction: (groupID, urlID, title, fullUrl, visits) =>
            dispatch(addUrlAction(groupID, urlID, title, fullUrl, visits)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUrl);
