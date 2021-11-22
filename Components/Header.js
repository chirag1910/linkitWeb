import styles from "../styles/header.module.css";
import Link from "next/link";
import { connect } from "react-redux";
import { logout as logoutAction } from "../redux/action/authentication";
import AuthService from "../services/authService";

const Header = ({ user, logoutAction }) => {
    const handleLogout = async () => {
        await new AuthService().logout();
        logoutAction();
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="..." alt="..." />
            </div>
            <div className={styles.buttonGroup}>
                {!user ? (
                    <>
                        <Link href="/signup">
                            <a className={styles.signup}>Signup</a>
                        </Link>
                        <Link href="/login">
                            <a className={styles.login}>Login</a>
                        </Link>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            className={styles.logout}
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logoutAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
