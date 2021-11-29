import Head from "next/head";
import styles from "../styles/homePage.module.css";
import Header from "../Components/Header";

const Index = () => {
    const features = [
        {
            title: "URL group sharing",
            tagline: "Got sick of sharing multiple URLs again and again?",
            description:
                "Create a public group containing the URLs and share them all with just one link.",
            image: "/home/1.webp",
        },

        {
            title: "Shorten URL",
            tagline:
                "Get rid of long uniform resource locators! Convert them into short URLs.",
            description:
                "Just add orginal links in the group and get short shareable link.",
            image: "/home/2.webp",
        },

        {
            title: "Free forever",
            tagline: "No credit cards! No commitments!",
            description: "Create an account and start linking.",
            image: "/home/3.webp",
        },

        {
            title: "Interactive & simple UI",
            tagline:
                "Modern and simple design with no intrusive advertisements",
            image: "/home/4.webp",
        },

        {
            title: "Open source",
            tagline: "Having concerns about security and privacy?",
            description: "Completely open source project. Checkout ",
            image: "/home/5.webp",
        },
    ];

    return (
        <>
            <Head>
                <title>Home | LinkIt</title>
                <meta
                    name="description"
                    content="URL group sharing and URL shortner at one spot"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles.bg}>
                <Header />
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>LinkIt</h1>
                        <h2>One place for all your links</h2>
                    </div>
                    <div className={styles.body}>
                        {features.map((feat, index) => (
                            <div className={styles.featCard} key={index}>
                                <div className={styles.info}>
                                    <h2>{feat.title}</h2>
                                    <p>
                                        {feat.tagline && feat.tagline}
                                        <br />
                                        {feat.description && feat.description}
                                        {index === 4 && (
                                            <a
                                                href="https://github.com/chirag1910?tab=repositories"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                here!
                                            </a>
                                        )}
                                    </p>
                                </div>
                                <div className={styles.image}>
                                    <img src={feat.image} alt={feat.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
