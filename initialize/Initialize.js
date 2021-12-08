import nProgress from "nprogress";
import { connect } from "react-redux";
import { login as loginAction } from "../redux/action/authentication";
import ApiService from "../services/apiService";
import { useEffect } from "react";

const Initialize = ({ children, loginAction }) => {
    useEffect(async () => {
        nProgress.start();
        const response = await new ApiService().verifyUser();
        if (response.status === "ok") {
            loginAction(response.name, response.email, response.avatar);
        }
        nProgress.done();
    }, []);

    return <div>{children}</div>;
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (name, email, avatar) =>
            dispatch(loginAction(name, email, avatar)),
    };
};

export default connect(null, mapDispatchToProps)(Initialize);
