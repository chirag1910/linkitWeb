import Header from "../Components/Header";
import ResetPasswordContainer from "../Components/resetPasswordPage/resetPassword";
import styles from "../styles/headerShadow.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const resetPassword = ({ user }) => {
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
            <ResetPasswordContainer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(resetPassword);
