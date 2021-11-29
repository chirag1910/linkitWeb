import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import Header from "../../Components/Header";
import styles from "../../styles/publicGroupPage.module.css";
import PublicGroupContainer from "../../Components/PublicGroup";

const PublicGroup = () => {
    const router = useRouter();
    const { groupID } = router.query;

    const [showLoader, setShowLoader] = useState(true);
    const [groupLoaded, setGroupLoaded] = useState(false);

    const [groupTitle, setGroupTitle] = useState("Group");
    const [groupUrls, setGroupUrls] = useState([]);

    useEffect(async () => {
        if (!!groupID) {
            const response = await new ApiService().getPublicGroup(groupID);

            if (response.status === "ok") {
                setGroupTitle(response.title);
                setGroupUrls(response.urls);

                setShowLoader(false);
                setGroupLoaded(true);
            } else {
                router.push("/404");
            }
        }
    }, [groupID]);

    return (
        <>
            <Head>
                <title>URL group | LinkIt</title>
                <meta name="description" content="URL group | LinkIt" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles.main}>
                <Header />

                {showLoader && (
                    <div className={styles.loaderContainer}>
                        <div className={styles.loader} />
                    </div>
                )}

                {groupLoaded && (
                    <PublicGroupContainer title={groupTitle} urls={groupUrls} />
                )}
            </div>
        </>
    );
};

export default PublicGroup;
