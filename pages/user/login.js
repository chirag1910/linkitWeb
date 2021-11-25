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
