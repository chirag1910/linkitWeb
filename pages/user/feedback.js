import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Header from "../../Components/Header";
import FeedbackContainer from "../../Components/feedbackPage/Feedback";
import styles from "../../styles/feedbackPage.module.css";

const Feedback = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace({
                pathname: "/user/login",
                query: { next: "/user/feedback" },
            });
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Feedback | LinkIt</title>
                <meta name="description" content="Send feedback to LinkIt" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles.main}>
                <Header />
                <FeedbackContainer />
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(Feedback);
