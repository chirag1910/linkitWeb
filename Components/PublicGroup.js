import styles from "../styles/publicGroupPage.module.css";

const PublicGroup = ({ title, urls }) => {
    return (
        <div className={styles.groupContainer}>
            <div className={styles.groupHead}>
                <h1>{title}</h1>
            </div>
            <div className={styles.groupBody}>
                {!urls.length ? (
                    <div className={styles.noUrl}>
                        <h1>Group empty !!</h1>
                    </div>
                ) : (
                    urls.map((url) => (
                        <a
                            href={url.fullUrl}
                            key={url.urlID}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className={styles.urlCard}>
                                <h3>{url.title}</h3>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
};

export default PublicGroup;
