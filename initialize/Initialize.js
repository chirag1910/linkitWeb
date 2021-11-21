import { connect } from "react-redux";
import { login as loginAction } from "../redux/action/authentication";
import AuthService from "../services/authService";
import { useEffect } from "react";

const Initialize = ({ children, loginAction }) => {
    useEffect(async () => {
        const response = await new AuthService().verifyUser();
        if (response.status === "ok") {
            loginAction(response.name, response.email);
        }
    }, []);

    return <div>{children}</div>;
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (name, email) => dispatch(loginAction(name, email)),
    };
};

export default connect(null, mapDispatchToProps)(Initialize);
