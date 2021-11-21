import Header from "../Components/Header";
import SignupContainer from "../Components/signupPage/Signup";
import styles from "../styles/signupPage/index.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const signup = ({ user }) => {
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
            <SignupContainer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(signup);
