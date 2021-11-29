import Head from "next/head";
import styles from "../styles/error.module.css";
import Link from "next/link";

const Custom500 = () => {
    return (
        <>
            <Head>
                <title>500 | LinkIt</title>
                <meta name="description" content="Internal server error" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
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
        </>
    );
};

export default Custom500;
