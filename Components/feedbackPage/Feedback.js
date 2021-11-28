import nProgress from "nprogress";
import styles from "../../styles/feedbackPage.module.css";
import ApiService from "../../services/apiService";
import { useState } from "react";

const Feedback = () => {
    const [loading, setLoading] = useState(false);

    const [feedback, setFeedback] = useState("");

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
            nProgress.start();

            const response = await new ApiService().sendFeedback(feedback);

            if (response.status === "ok") {
                updateMessage("Thanks for your feedback");
                setFeedback("");
            } else {
                updateMessage(response.error, true);
            }
        }
        setLoading(false);
        nProgress.done();
    };

    const isValidateForm = () => {
        if (!feedback) {
            updateMessage("Feedback can not be empty", true);
            return false;
        }
        return true;
    };

    return (
        <>
            <div className={styles.feedbackContainer}>
                <div className={styles.feedbackHeader}>
                    <h1>Send feedback</h1>
                </div>

                <hr />

                <div className={styles.feedback}>
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
                        <h2>Feedback</h2>
                        <form
                            onSubmit={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="feedback" value="Feedback" />
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    cols="50"
                                    autoFocus={true}
                                    maxLength="500"
                                    placeholder="Feedback"
                                    value={feedback}
                                    onChange={(e) => {
                                        setFeedback(e.target.value);
                                    }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={styles.formButton}
                                disabled={loading}
                            >
                                Send feedback
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feedback;
