import styles from "../../styles/groupPage.module.css";
import ApiService from "../../services/apiService";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setUrls as setUrlsAction } from "../../redux/action/url";
import UrlCard from "./UrlCard";

const Urls = ({ urls, group, setUrlsAction }) => {
    const [message, setMessage] = useState("Loading...");
    const [error, setError] = useState("");

    useEffect(async () => {
        if (group.groupID) {
            const response = await new ApiService().getUrls(group.groupID);
            if (response.status === "ok") {
                setUrlsAction(response.urls);
            } else {
                setError(response.error);
            }
            setMessage("");
        }
    }, []);

    return (
        <div className={styles.urlMain}>
            <h1>Urls | {urls.length}</h1>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!urls.length && !message && !error && (
                <h2 className={styles.noUrl}>Add urls to get started</h2>
            )}
            {urls.length && !message && !error ? (
                <div className={styles.urlsContainer}>
                    {urls.map((url) => (
                        <UrlCard url={url} key={url.urlID} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        group: state.urlGroup.activeGroup,
        urls: state.url.urls,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUrlsAction: (urls) => dispatch(setUrlsAction(urls)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Urls);
