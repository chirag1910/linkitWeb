import Head from "next/head";
import Header from "../../Components/Header";
import SignupContainer from "../../Components/signupPage/Signup";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const signup = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/user");
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Signup | LinkIt</title>
                <meta name="description" content="LinkIt signup page" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Header />
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
