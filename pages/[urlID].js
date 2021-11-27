import { useRouter } from "next/router";
import { useEffect } from "react";
import ApiService from "../services/apiService";
import styles from "../styles/publicUrlPage.module.css";

const publicUrl = () => {
    const router = useRouter();
    const { urlID } = router.query;

    useEffect(async () => {
        if (!!urlID) {
            const response = await new ApiService().getPublicUrl(urlID);

            if (response.status === "ok") {
                router.replace(response.fullUrl);
            } else {
                router.replace("/404");
            }
        }
    }, [urlID]);

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader} />
        </div>
    );
};

export default publicUrl;
