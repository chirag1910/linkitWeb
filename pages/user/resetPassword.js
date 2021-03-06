import Head from "next/head";
import Header from "../../Components/Header";
import ResetPasswordContainer from "../../Components/resetPasswordPage/ResetPassword";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const ResetPassword = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/user");
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Reset Password | LinkIt</title>
                <meta name="description" content="LinkIt reset password page" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
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

export default connect(mapStateToProps)(ResetPassword);
