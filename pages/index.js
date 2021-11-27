import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Components/Header";
import { connect } from "react-redux";

const index = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/user");
        }
    }, [user]);

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
            <Header />
            <div>Hello anonymous</div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(index);
