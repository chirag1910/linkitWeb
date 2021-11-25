import styles from "../../styles/dashboard.module.css";
import formStyles from "../../styles/standaloneForm.module.css";
import ApiService from "../../services/apiService";
import { useState } from "react";
import { connect } from "react-redux";
import { addGroup as addGroupAction } from "../../redux/action/urlGroup";

const CreateGroup = ({ addGroupAction }) => {
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [publicGroup, setPublicGroup] = useState(false);

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

            const response = await new ApiService().createGroup(
                title.trim(),
                publicGroup
            );

            if (response.status === "ok") {
                updateMessage("Group created successfully");
                setTitle("");
                setPublicGroup(false);
                addGroupAction(
                    response.groupID,
                    response.title,
                    response.public
                );
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
        return true;
    };

    return (
        <div className={styles.createGroupContainer}>
            <div className={styles.createHeader}>
                <h1>New Group</h1>
                <button
                    type="button"
                    className={formStyles.formButton}
                    onClick={() => {
                        setExpand(!expand);
                    }}
                >
                    {expand ? "Close x" : "Create +"}
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

                    <label className={formStyles.checkbox}>
                        Public group
                        <input
                            type="checkbox"
                            checked={publicGroup}
                            onChange={(e) => setPublicGroup(e.target.checked)}
                        />
                        <span className={formStyles.checkmark}></span>
                    </label>

                    <button
                        type="submit"
                        className={formStyles.formButton}
                        disabled={loading}
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGroupAction: (groupID, title, publicGroup) =>
            dispatch(addGroupAction(groupID, title, publicGroup)),
    };
};

export default connect(null, mapDispatchToProps)(CreateGroup);
