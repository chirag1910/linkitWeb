import nProgress from "nprogress";
import styles from "../styles/header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { logout as logoutAction } from "../redux/action/authentication";
import ApiService from "../services/apiService";

const Header = ({ user, logoutAction }) => {
    const router = useRouter();

    const handleLogout = async () => {
        nProgress.start();
        await new ApiService().logout();
        logoutAction();
        nProgress.done();
        router.push("/");
    };

    return (
        <div className={styles.header}>
            <Link href="/">
                <a>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="LinkIt" />
                    </div>
                </a>
            </Link>
            {!user ? (
                <div className={styles.buttonGroup}>
                    <Link href="/user/login">
                        <a className={styles.login}>Login</a>
                    </Link>
                    <Link href="/user/signup">
                        <a className={styles.signup}>Signup</a>
                    </Link>
                </div>
            ) : (
                <div className={styles.collapsible}>
                    <button type="button" className={styles.profile}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 25 25"
                        >
                            <path
                                id="User_Circle_1_"
                                d="M12.5,0C5.61,0,0,5.61,0,12.5c0,3.39,1.4,6.68,3.84,9.02c2.19,2.11,5.03,3.31,8.06,3.45
	c0.15,0.01,0.31,0.03,0.46,0.03c0.02,0,0.05,0,0.07,0c0.02,0,0.05,0,0.07,0c3.23,0,6.29-1.22,8.63-3.45c2.5-2.39,3.87-5.6,3.87-9.05
	C25,5.61,19.39,0,12.5,0z M20.91,20.33c-0.46-1.63-2.64-2.51-4.28-3.16l-0.56-0.23C15,16.5,15,16.09,15,15.5
	c0-0.42,0.21-1.02,0.59-1.38c0.97-0.85,1.48-2.02,1.48-3.38C17.07,7.99,15.15,6,12.5,6c-2.64,0-4.48,1.95-4.48,4.74
	c0,1.42,0.48,2.56,1.41,3.38c0.39,0.35,0.56,0.96,0.56,1.38c0,0.42,0,0.94-1.3,1.47c-1.6,0.66-3.72,1.56-4.69,3.26
	c-1.91-2.11-3-4.88-3-7.73C1,6.16,6.16,1,12.5,1S24,6.16,24,12.5C24,15.44,22.9,18.19,20.91,20.33z"
                            />
                        </svg>
                    </button>
                    <div className={styles.profileMenu}>
                        <ul>
                            <li>
                                <Link href="/user">
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/settings">
                                    <a className={styles.settings}>Settings</a>
                                </Link>
                            </li>
                            <li
                                className={styles.logout}
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            )}
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
