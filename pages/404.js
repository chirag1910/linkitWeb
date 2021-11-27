import styles from "../styles/error.module.css";
import Link from "next/link";

const custom404 = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>404 | Page not found</h1>
                <Link href="/">
                    <a>
                        <h3>Go to home page -&gt;</h3>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default custom404;
