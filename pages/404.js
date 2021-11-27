import Head from "next/head";
import styles from "../styles/error.module.css";
import Link from "next/link";

const custom404 = () => {
    return (
        <>
            <Head>
                <title>404 | LinkIt</title>
                <meta name="description" content="Page not found" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
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
        </>
    );
};

export default custom404;
