import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Components/Header";
import { connect } from "react-redux";

const index = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/home");
        }
    }, [user]);

    return (
        <>
            <Header />
            <div>Hello anonymous</div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(index);
