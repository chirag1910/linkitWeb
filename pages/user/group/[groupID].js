import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ApiService from "../../../services/apiService";
import Header from "../../../Components/Header";
import TitleContainer from "../../../Components/groupPage/Title";
import ShareGroupContainer from "../../../Components/groupPage/ShareGroup";
import SettingsContainer from "../../../Components/groupPage/Settings";
import CreateUrlContainer from "../../../Components/groupPage/CreateUrl";
import UrlsContainer from "../../../Components/groupPage/urls";
import styles from "../../../styles/groupPage.module.css";
import { setActiveGroup as setActiveGroupAction } from "../../../redux/action/urlGroup";

const Group = ({ user, setActiveGroupAction }) => {
    const router = useRouter();
    const { groupID } = router.query;

    const [grouploaded, setGroupLoaded] = useState(false);

    const [message, setMessage] = useState("Loading...");
    const [isMessageError, setIsMessageError] = useState(false);

    useEffect(() => {
        if (!!groupID) {
            if (!user) {
                router.replace({
                    pathname: "/user/login",
                    query: { next: `/user/group/${groupID}` },
                });
            }
        }
    }, [user]);

    useEffect(async () => {
        if (!!groupID) {
            const response = await new ApiService().getGroup(groupID);

            if (response.status === "ok") {
                setActiveGroupAction(
                    response.groupID,
                    response.title,
                    response.public
                );
                updateMessage("");

                setGroupLoaded(true);
            } else {
                updateMessage(response.error, true);

                if (response.error == "Not authorized") {
                    router.replace({
                        pathname: "/user/login",
                    });
                }
            }
        }
    }, [groupID]);

    const updateMessage = (message, isError = false) => {
        setMessage(message);
        setIsMessageError(isError);
    };

    return (
        <>
            <Head>
                <title>URL group | LinkIt</title>
                <meta name="description" content="URL group page | LinkIt" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles.main}>
                <Header />

                {message && (
                    <p
                        className={`${styles.message} ${
                            isMessageError ? styles.error : styles.success
                        }`}
                    >
                        {message}
                    </p>
                )}

                {grouploaded && (
                    <>
                        <TitleContainer />
                        <ShareGroupContainer />
                        <SettingsContainer />
                        <CreateUrlContainer />
                        <UrlsContainer />
                    </>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveGroupAction: (groupID, title, publicGroup) =>
            dispatch(setActiveGroupAction(groupID, title, publicGroup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
