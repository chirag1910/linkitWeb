import styles from "../styles/header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { logout as logoutAction } from "../redux/action/authentication";
import ApiService from "../services/apiService";

const Header = ({ user, logoutAction }) => {
    const router = useRouter();

    const handleLogout = async () => {
        await new ApiService().logout();
        logoutAction();
        router.push("/");
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="/vercel.svg" alt="..." />
            </div>
            <div className={styles.buttonGroup}>
                {!user ? (
                    <>
                        <Link href="/user/signup">
                            <a className={styles.signup}>Signup</a>
                        </Link>
                        <Link href="/user/login">
                            <a className={styles.login}>Login</a>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/user/settings">
                            <a className={styles.settings}>Settings</a>
                        </Link>
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
