import styles from "../styles/error.module.css";
import Link from "next/link";

const custom500 = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>500 | Internal server error</h1>
                <Link href="/">
                    <a>
                        <h3>Go to home page -&gt;</h3>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default custom500;
