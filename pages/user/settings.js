import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Header from "../../Components/Header";
import SettingsContainer from "../../Components/settingsPage/Settings";
import styles from "../../styles/settingsPage.module.css";

const settings = ({ user, groups }) => {
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace({
                pathname: "/user/login",
                query: { next: "/user/settings" },
            });
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Settings | LinkIt</title>
                <meta
                    name="description"
                    content="User's settings page | LinkIt"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles.main}>
                <Header />
                <SettingsContainer />
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        groups: state.urlGroup.groups,
    };
};

export default connect(mapStateToProps)(settings);
