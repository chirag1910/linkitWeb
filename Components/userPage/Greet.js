import styles from "../../styles/dashboard.module.css";
import { connect } from "react-redux";

const Greet = ({ user }) => {
    return (
        <div className={styles.greetContainer}>
            <h1>Hi, {user ? user.name : "User"}</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(Greet);
