import Header from "../../Components/Header";
import ResetPasswordContainer from "../../Components/resetPasswordPage/resetPassword";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const resetPassword = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/user");
        }
    }, [user]);

    return (
        <>
            <Header />
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
