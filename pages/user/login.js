import Head from "next/head";
import Header from "../../Components/Header";
import LoginContainer from "../../Components/loginPage/Login";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const login = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        const { next: nextRedirect } = router.query;
        if (user) {
            router.replace(nextRedirect ? nextRedirect : "/user");
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Login | LinkIt</title>
                <meta name="description" content="LinkIt login page" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Header />
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
