import styles from "../../styles/dashboard.module.css";
import ApiService from "../../services/apiService";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const QuickInfo = ({ groups }) => {
    const [visits, setVisits] = useState("Loading...");
    const [totalUrls, setTotalUrls] = useState("Loading...");

    useEffect(async () => {
        const response = await new ApiService().getTotalUrlVisits();
        if (response.status === "ok") {
            setVisits(response.visits);
        } else {
            setVisits("N/A");
        }
    }, []);

    useEffect(async () => {
        const response = await new ApiService().getTotalUrlCount();
        if (response.status === "ok") {
            setTotalUrls(response.count);
        } else {
            setTotalUrls("N/A");
        }
    }, []);

    return (
        <div className={styles.quickInfoContainer}>
            <div className={styles.quickInfo}>
                <p>Total visits</p>
                <h2>{visits}</h2>
            </div>

            <div className={styles.quickInfo}>
                <p>Total Groups</p>
                <h2>{groups.length}</h2>
            </div>

            <div className={styles.quickInfo}>
                <p>Total Urls</p>
                <h2>{totalUrls}</h2>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        groups: state.urlGroup.groups,
    };
};

export default connect(mapStateToProps)(QuickInfo);
