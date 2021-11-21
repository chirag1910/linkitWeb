import Header from "../Components/Header";
import LoginContainer from "../Components/loginPage/Login";
import styles from "../styles/loginPage/index.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const login = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user]);

    return (
        <>
            <div className={styles.headerContainer}>
                <Header />
            </div>
            <LoginContainer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(login);
