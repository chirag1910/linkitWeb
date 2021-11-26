import styles from "../../styles/dashboard.module.css";
import ApiService from "../../services/apiService";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import { setGroups as setGroupsAction } from "../../redux/action/urlGroup";

const Groups = ({ groups, setGroupsAction }) => {
    const [message, setMessage] = useState("Loading...");
    const [error, setError] = useState("");

    useEffect(async () => {
        const response = await new ApiService().getGroups();
        if (response.status === "ok") {
            setGroupsAction(response.groups);
        } else {
            setError(response.error);
        }
        setMessage("");
    }, []);

    return (
        <div className={styles.groupsMain}>
            <h1>Groups</h1>
            {message && <p className={styles.message}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!groups.length && !message && !error && (
                <h2 className={styles.noGroup}>Create group to get started</h2>
            )}
            <div className={styles.groupsContainer}>
                {groups.map((group) => (
                    <Link
                        href={`/user/group/${group.groupID}`}
                        key={group.groupID}
                    >
                        <a>
                            <div
                                className={`${styles.groupCard} ${
                                    group.public
                                        ? styles.public
                                        : styles.private
                                }`}
                            >
                                <h2>{group.title}</h2>
                                <p
                                    className={
                                        group.public
                                            ? styles.public
                                            : styles.private
                                    }
                                >
                                    {group.public ? "Public" : "Private"}
                                </p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        groups: state.urlGroup.groups,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGroupsAction: (groups) => dispatch(setGroupsAction(groups)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
