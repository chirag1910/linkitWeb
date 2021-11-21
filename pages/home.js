import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Components/Header";
import { connect } from "react-redux";

const home = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user]);

    return (
        <>
            <Header />
            <div>Hello {user && user.name}</div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(home);
