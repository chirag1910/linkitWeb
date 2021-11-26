import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Header from "../../Components/Header";
import GreetContainer from "../../Components/userPage/Greet";
import QuickInfoContainer from "../../Components/userPage/QuickInfo";
import CreateGroupContainer from "../../Components/userPage/CreateGroup";
import GroupsContainer from "../../Components/userPage/Groups";
import styles from "../../styles/dashboard.module.css";

const dashboard = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace({
                pathname: "/user/login",
                query: { next: "/user" },
            });
        }
    }, [user]);

    return (
        <div className={styles.dashboard}>
            <Header />
            <GreetContainer name={user && user.name} />
            <QuickInfoContainer />
            <CreateGroupContainer />
            <GroupsContainer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(dashboard);
