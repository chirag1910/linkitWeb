import styles from "../../styles/groupPage.module.css";
import { connect } from "react-redux";

const Title = ({ group }) => {
    return (
        <div className={styles.groupTitle}>
            <h1>
                {group ? group.title : "Group"}
                {" | "}
                <span className={group.public ? styles.public : styles.private}>
                    {group.public ? "Public" : "Private"}
                </span>
            </h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        group: state.urlGroup.activeGroup,
    };
};

export default connect(mapStateToProps)(Title);
